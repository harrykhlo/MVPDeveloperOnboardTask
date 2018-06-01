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
    public class StoreController : Controller
    {

        // database object
        private ErpMvcEfOnboardTaskEntities db = new ErpMvcEfOnboardTaskEntities();

        // GET: Store
        public ActionResult Index()
        {
            return View();
        }

        // list the store records on index page via loadData() in Store.js
        public JsonResult List()
        {
            var stores = db.Stores.Select(x => new
            {
                Id = x.Id,
                Address = x.Address,
                Name = x.Name
            }).ToList();

            return Json(stores, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Store cus)
        {
            db.Stores.Add(cus);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveStore(int ID)
        {
            Store store = db.Stores.Find(ID);
            db.Stores.Remove(store);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var stores = db.Stores.Where(x => x.Id == ID).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address,
            }).FirstOrDefault();
            return Json(stores, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Store cus)
        {
            db.Entry(cus).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

    }
}