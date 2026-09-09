using Microsoft.AspNetCore.Mvc;

namespace Nascore.Controllers
{
    public class ProjectController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Detail(int id)
        {
            ViewBag.ProjectId = id;
            return View();
        }
    }
}
