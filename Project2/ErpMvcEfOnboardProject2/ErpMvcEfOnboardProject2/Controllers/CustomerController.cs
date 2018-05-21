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
    public class CustomerController : Controller
    {

        //
        private ErpMvcEfOnboardTaskEntities db = new ErpMvcEfOnboardTaskEntities();

        // GET: Customer
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            var customers = db.Customers.Select(x => new
            {
                Id = x.Id,
                Address = x.Address,
                Name = x.Name
            }).ToList();

            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Customer cus)
        {
            db.Customers.Add(cus);

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RemoveCustomer(int ID)
        {
            Customer customer = db.Customers.Find(ID);
            db.Customers.Remove(customer);
            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }

        

        public JsonResult GetbyID(int ID)
        {
            var customers = db.Customers.Where(x => x.Id == ID).Select(x => new
            {
                Id = x.Id,
                Name = x.Name,
                //Age = x.Age,
                Address = x.Address,
            }).FirstOrDefault();
            return Json(customers, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Update(Customer cus)
        {
            db.Entry(cus).State = EntityState.Modified;

            return Json(db.SaveChanges(), JsonRequestBehavior.AllowGet);
        }






    }
}
