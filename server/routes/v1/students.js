const { Router } = require("express");
const router = Router();
const studentController = require("../../controllers/v1/students");
router.use(logger)
router.get("/getList", studentController.getStudents);

router.post("/add", studentController.addStudent);

router
  .route("/:id")
  .get(studentController.getStudentById)
  .delete(studentController.deleteStudentById)
  .put(studentController.updateStudentById);

// Can also use separately
// router.delete("/delete/:id",studentController.deleteStudentById)
// router.put("/update/:id",studentController.updateStudentById)

router.param('id',(req,res,next,id)=>{
    console.log("router.param.id: "+id)
    req.user = id
    console.log("req.user: "+req.user)
    next()
})

module.exports = router;

function logger(req,res,next){
    console.log("routes/v1: "+req.originalUrl)
    next()
  }