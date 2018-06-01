using ErpMvcEfOnboardProject2.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ErpMvcEfOnboardProject2.Controllers
{
    

    public class ProductController : Controller
    {

        // database object
        private ErpMvcEfOnboardTaskEntities db = new ErpMvcEfOnboardTaskEntities();

        // GET: Product
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var products = db.Products.Select(x => new
            {
                Id = x.Id,
                Price = x.Price,
                Name = x.Name
            }).ToList();

            return Json(products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Product cus)
        {
            db.Products.Add(cus);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveProduct(int ID)
        {
            Product product = db.Products.Find(ID);
            db.Products.Remove(product);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var products = db.Products.Where(x => x.Id == ID).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price,
            }).FirstOrDefault();
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Product cus)
        {
            db.Entry(cus).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

    }
}