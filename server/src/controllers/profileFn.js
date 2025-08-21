import Profile from "../models/profile.js";
// fetch all user profiles
async function getAllContacts(req, res) {
  try {
    const contactD = await Profile.findAll({});
    res.status(200).send(contactD);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
}
// fetch a profile data by id
async function getContact(req, res) {
  try {
    const id = req.params.id;
    const contactD = await Profile.findOne({ where: { id: id } });
    res.status(200).send(contactD);
  } catch (err) {
    res.status(404).send(err.message);
  }
}
// create new user profile data || update an existing one
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
// remove an existing user profile
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
// update existing profile picture data || create one
async function updateContact(req, res) {
  const userId = req.params.userId;
  const ProfilePhoto = req.body.Photo;
  try {
    const userContact = await Profile.findOne({
      where: { userId: userId },
    });
    if (userContact) {
      const contactD = await Profile.update(
        {
          Photo: ProfilePhoto,
        },
        {
          where: { userId: userId },
        }
      );

      res
        .status(201)
        .send({ mssg: "profile data has been updated successfully" });
    } else {
      const contactD = await Profile.create(
        {
          Photo: ProfilePhoto,
        },
        {
          where: { userId: userId },
        }
      );
      res.status(201).send({ mssg: "contact has been created successfully" });
    }
  } catch (err) {
    res.status(404).send(err.message);
  }
}
// fetch user profile by user id
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

export {
  getUserContact,
  getAllContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
};
