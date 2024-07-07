using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext context;
        public BasketController(StoreContext context)
        {
            this.context = context;

        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> GetBasket()
        {
            Basket basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            return MapBasketToDTO(basket);
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItemToBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await context.Products.FindAsync(productId);
            if (product == null) BadRequest(new ProblemDetails { Title = "Product Not Found" });
            basket.AddItem(product, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving Item to Basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productid, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();
            basket.RemoveItem(productid, quantity);
            var result = await context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Problem removing Item from Basket" }); ;
        }

        private async Task<Basket> RetrieveBasket()
        {
            return await context.Baskets.Include(i => i.Items).ThenInclude(p => p.Product).FirstOrDefaultAsync(x => x.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOpions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOpions);
            Response.Cookies.Append("dummyBuyerId", buyerId, cookieOpions);
            var basket = new Basket { BuyerId = buyerId };
            context.Baskets.Add(basket);
            return basket;
        }

        private BasketDTO MapBasketToDTO(Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Price = item.Product.Price,
                    PictureUrl = item.Product.PictureUrl,
                    Brand = item.Product.Brand,
                    Type = item.Product.Type,
                    Quantity = item.Quantity
                }).ToList()
            };
        }
    }
}