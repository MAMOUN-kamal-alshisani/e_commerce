const ContactDetails = require("../models/contactD");
const User = require("../models/user");
async function getAllContacts(req, res) {
  try {
    const contactD = await ContactDetails.findAll({});
    // console.log(contactD);
    res.status(200).send(contactD);
  } catch (err) {
    // console.log(err);
    res.status(404).send(err);
  }
}

async function getContact(req, res) {
  try {
    const id = req.params.id;
    const contactD = await ContactDetails.findOne({ where: { id: id } });
    res.status(200).send(contactD);
    console.log(contactD);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function createContact(req, res) {
  const { fullName, birthDate, phone, city, address, photo } = req.body;
  const userId = req.params.userId;
  try {
    const user =await User.findOne({where:{id:userId}})

    if(user){
      const contactD = await ContactDetails.create({
        fullName: fullName,
        birthDate: birthDate,
        phone: phone,
        city: city,
        address: address,
        photo: photo,
        UserId: userId,
      });
      res.status(201).send("contact created successfully");
    }
    // const userID = req.query.userId
 

  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function deleteContact(req, res) {
  const id = req.params.id;
  try {
   let contact = await ContactDetails.findOne({ where: { id: id } })
    if(contact){
      const contactD = await ContactDetails.destroy({ where: { id: id } });
      res.status(200).send("contact has been removed successfully");
    }
  
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function updateContact(req, res) {
  const UserId = req.params.UserId;

  try {
    const userContact = await ContactDetails.findOne({where:{UserId:UserId}})
    if(userContact){
      const contactD = await ContactDetails.update(req.body, {
        where: { UserId: UserId },
      });
    res.status(201).send("contact has been updated successfully");

    }

  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

async function getUserContact(req, res) {
  try {
    const UserId = req.params.UserId;
    const contactD = await ContactDetails.findOne({
      where: { UserId: UserId },
    });
    res.status(200).send(contactD);
    console.log(contactD);
  } catch (err) {
    console.log(err);
    res.status(404).send(err.message);
  }
}

module.exports = {
  getUserContact,
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
