using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<User> userManager;
        private readonly TokenService tokenService;
        private readonly StoreContext context;

        public AccountController(UserManager<User> userManager, TokenService tokenService, StoreContext context)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.context = context;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
        {
            var user = await userManager.FindByNameAsync(loginDTO.Username);
            if (user == null || !await userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                return Unauthorized();
            }
            var userBasket = await RetrieveBasket(loginDTO.Username);
            var anonymousBasket = await RetrieveBasket(Request.Cookies["buyerId"]);
            if (anonymousBasket != null)
            {
                if (userBasket != null)
                {
                    context.Baskets.Remove(userBasket);
                }
                anonymousBasket.BuyerId = user.UserName;
                Response.Cookies.Delete("buyerId");
                await context.SaveChangesAsync();
            }
            return new UserDTO()
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
                Basket = anonymousBasket != null ? anonymousBasket.MapBasketToDTO() : userBasket?.MapBasketToDTO()
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDTO registerDTO)
        {
            var user = new User
            {
                UserName = registerDTO.Username,
                Email = registerDTO.Email
            };
            var result = await userManager.CreateAsync(user, registerDTO.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(error.Code, error.Description);
                }
                return ValidationProblem();
            }
            await userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }

        [Authorize]
        [HttpGet("currentuser")]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await userManager.FindByNameAsync(User.Identity.Name);
            var userBasket = await RetrieveBasket(User.Identity.Name);
            return new UserDTO
            {
                Email = user.Email,
                Token = await tokenService.GenerateToken(user),
                Basket = userBasket?.MapBasketToDTO()
            };
        }

        [Authorize]
        [HttpGet("savedAddress")]
        public async Task<ActionResult<UserAddress>> GetSavedAddress()
        {
            return await userManager.Users.Where(x => x.UserName == User.Identity.Name).Select(u => u.Address).FirstOrDefaultAsync();
        }

        private async Task<Basket> RetrieveBasket(string buyerId)
        {
            if (string.IsNullOrEmpty(buyerId))
            {
                Response.Cookies.Delete("buyerId");
                return null;
            }
            return await context.Baskets.Include(i => i.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }
    }
}