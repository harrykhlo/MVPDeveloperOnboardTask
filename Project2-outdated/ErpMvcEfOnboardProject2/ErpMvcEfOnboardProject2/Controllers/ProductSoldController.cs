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
    public class ProductSoldController : Controller
    {
        public class ProductSoldViewModel
        {

            public int Id { get; set; }
            public long ProductId { get; set; }
            public long CustomerId { get; set; }
            public int StoreId { get; set; }
            public string DateSold { get; set; }
        }

        // database object
        private ErpMvcEfOnboardTaskEntities db = new ErpMvcEfOnboardTaskEntities();

        // GET: ProductSold
        public ActionResult Index()
        {
            var psold = new ProductSold();
            //ViewBag.CustomerId = new SelectList(db.Customers, "Id", "CustomerName", psold.CustomerId);
            //ViewBag.ProductId = new SelectList(db.Products, "Id", "ProductName", psold.ProductId);
            //ViewBag.StoreId = new SelectList(db.Stores, "Id", "StoreName", psold.StoreId);
            ViewBag.CustomerId = new SelectList(db.Customers, "Id", "Name", psold.CustomerId);
            ViewBag.ProductId = new SelectList(db.Products, "Id", "Name", psold.ProductId);
            ViewBag.StoreId = new SelectList(db.Stores, "Id", "Name", psold.StoreId);

            return View();
        }

        public JsonResult List()
        {
            var productSolds = db.ProductSolds.Include(p => p.Customer).Include(p => p.Product).Include(p => p.Store).Select(x => new 
            {
                Id = x.Id,
                //CustomerId = x.CustomerId,
                CustomerName = x.Customer.Name,
                //ProductId = x.ProductId,
                ProductName = x.Product.Name,
                //StoreId = x.StoreId,
                StoreName = x.Store.Name,
                Day = x.DateSold.Day,
                Month = x.DateSold.Month,
                Year = x.DateSold.Year
            }).ToList();

            return Json(productSolds, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ProductSold psold)
        {
            db.ProductSolds.Add(psold);
            db.SaveChanges();

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveProduct(long ID)
        {
            ProductSold psold = db.ProductSolds.Find(ID);
            db.ProductSolds.Remove(psold);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        //public JsonResult GetbyID(int ID)
        //{
        //    //var ProductSolds = db.ProductSolds.Where(x => x.Id == ID).Select(x => new ProductSoldViewModel
        //    var ProductSolds = db.ProductSolds.Where(x => x.Id == ID).Select(x => new 
        //    {
        //        Id = ID,
        //        CustomerId = x.CustomerId,
        //        StoreId = x.StoreId,
        //        ProductId = x.ProductId,
        //        //DateSold = x.DateSold.Day + "/" + x.DateSold.Month + "/" + x.DateSold.Year
        //        DateSold = x.DateSold
        //    }).FirstOrDefault();
        //    return Json(ProductSolds, JsonRequestBehavior.AllowGet);
        //}

        //public JsonResult Update(ProductSold psold)
        //{
        //    db.Entry(psold).State = EntityState.Modified;
        //    db.SaveChanges();
        //    return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        //}

    }
}

