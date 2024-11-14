const Profile = require("../models/profile");
const User = require("../models/user");

async function getAllContacts(req, res) {
  try {
    const contactD = await Profile.findAll({});
    res.status(200).send(contactD);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}

async function getContact(req, res) {
  try {
    const id = req.params.id;
    const contactD = await Profile.findOne({ where: { id: id } });
    res.status(200).send(contactD);
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function createContact(req, res) {
  const { Fname, Lname, Phone, BirthDate, Country, Address, Gender, Email } =
    req.body;
  const userId = req.params.userId;
  try {
    const userProfileDetailsExist = await Profile.findOne({
      where: { userId: userId },
    });
    if (userProfileDetailsExist) {
      const contactD = await Profile.update(req.body, {
        where: { userId: userId },
      });
      res.status(201).send("contact updated successfully");
    } else {
      const contactD = await Profile.create({
        Fname: Fname,
        Lname: Lname,
        Phone: Phone,
        BirthDate: BirthDate,
        Country: Country,
        Address: Address,
        Email: Email,
        Gender: Gender,
        userId: userId,
      });

      res.status(201).send("contact created successfully");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function deleteContact(req, res) {
  const id = req.params.id;
  try {
    let contact = await Profile.findOne({ where: { id: id } });
    if (contact) {
      const contactD = await Profile.destroy({ where: { id: id } });
      res.status(200).send("contact has been removed successfully");
    }
  } catch (err) {
    res.status(404).send(err);
  }
}

async function updateContact(req, res) {
  const userId = req.params.userId;
  try {
    const userContact = await Profile.findOne({
      where: { userId: userId },
    });
    if(!userContact) return res.status(404).send('profile with specified (Id) is not found!')
    else {
      const contactD = await Profile.update(req.body, {
        where: { userId: userId },
      });
      res.status(201).send("profile data has been updated successfully");
    }
    //  else {
    //   const contactD = await Profile.create(req.body, userId {
    //     where: { userId: userId },
    //   });
    //   res.status(201).send("contact has been updated successfully");
    // }
  } catch (err) {
    res.status(404).send(err.message);
  }
}

async function getUserContact(req, res) {
  try {
    const userId = req.params.userId;
    const contactD = await Profile.findOne({
      where: { userId: userId },
    });
    if (!contactD) {
      res.status(200).send(null);
    } else {
      res.status(200).send(contactD);
    }
  } catch (err) {
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
