using System.Text.Json;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly StoreContext context;

        public ProductsController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            IQueryable<Product> query = context.Products.Sort(productParams.OrderBy).Search(productParams.SearchTerm).Filter(productParams.Brands, productParams.Types).AsQueryable();
            PagedList<Product> products = await PagedList<Product>.ToPagedList(query, productParams.PageNumber, productParams.PageSize);
            Response.AddPaginationHeader(products.MetaData);
            return products;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            List<string> brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            List<string> types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { types, brands });
        }
    }
}