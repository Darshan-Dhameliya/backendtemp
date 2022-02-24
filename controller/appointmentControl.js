const _ = require("underscore");
const moment = require("moment");
const Appoint = require("../models/appointmentModel");
const Emp = require("../models/employeeModel");

function appointment() {
  this.makeAppo = async (req, res) => {
    let bdata = req.body;
    const appoints = await Appoint.find({
      $and: [
        {
          userid: bdata.userid,
        },
        { service: bdata.service },
        { date: bdata.date },
        { time: bdata.time },
      ],
    }).clone();
    if (appoints.length) {
      res.send({
        status: false,
        message: "Appoiment Already Book For this",
      });
    } else {
      Emp.findOne(
        { service_Spec: bdata.service, service_Area: bdata.area },
        async (err, data) => {
          if (data) {
            bdata.emp_appoint = data.id;
            const ApppoiMentObJ = {
              userid: bdata.userid,
              username: bdata.username,
              useremail: bdata.useremail,
              userphone: bdata.userphone,
              userAddress: bdata.userAddress,
              service: bdata.service,
              charge: bdata.charge,
              area: bdata.area,
              emp_appoint: bdata.emp_appoint,
              date: bdata.date,
              time: bdata.time,
            };
            await Appoint.create(ApppoiMentObJ, (err, resu) => {
              if (resu) {
                res.send({
                  status: true,
                  AppID: resu._id,
                  message: "appointment taken successfully..",
                });
              }
            });
          } else {
            res.send({
              status: false,
              message: "Not Employee In this Area",
            });
          }
        }
      );
    }
  };

  this.markAsCompleted = async (req, res) => {
    const { id } = req.body;
    try {
      const data = await Appoint.findByIdAndUpdate(
        id,
        { isCompleted: true },
        { new: true }
      );
      res.send({ status: true, data });
    } catch (e) {
      res.send({ status: false, e });
    }
  };

  this.completemakeAppoUser = async (req, res) => {
    const { id } = req.body;

    const data = await Appoint.find({
      $and: [{ emp_appoint: id }, { isCompleted: true }],
    });

    res.send({ status: true, data });
  };

  this.completemakeAppoEmp = async (req, res) => {
    const { id } = req.body;

    const data = await Appoint.find({
      $and: [{ userid: id }, { isCompleted: true }],
    });

    res.send({ status: true, data });
  };

  this.updAppo = (req, res) => {};
}

module.exports = new appointment();
