using Microsoft.AspNetCore.Mvc;

namespace Nascore.Controllers;

public class About : Controller
{
    // GET: About
    public ActionResult Index()
    {
        return View();
    }
}
