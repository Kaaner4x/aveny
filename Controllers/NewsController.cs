using Microsoft.AspNetCore.Mvc;

namespace Nascore.Controllers
{
    public class NewsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail(int id)
        {
            ViewBag.NewsId = id;
            return View();
        }
    }
}
