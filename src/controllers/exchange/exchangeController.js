import axios from "axios";
import Exchange from "../../models/Exchange.js";
import User from "../../models/User.js";
import { getUserData } from "../../resources/userResource.js";
import Wallet from "../../models/Wallet.js";

const getExchangeUserData = async (user_id) => {
  const userData = await User.findOne({ _id: user_id });

  if (userData) {
    var user = {
      id: userData?.id,
      full_name: userData?.full_name,
      email: userData?.email,
      phone_number: userData?.phone_number,
      user_name: userData?.user_name,
    };
  }
  return user;
};

export { getExchangeUserData };

// API to get all users data
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// API to get all exchange data
const getAllExchangeData = async (req, res) => {
  try {
    const exchanges = await Exchange.find({});
    // Using Promise.all to handle the async operations inside map
    const exchangesWithUsername = await Promise.all(
      exchanges.map(async (exchange) => {
        const exchangeObj = exchange.toObject();

        exchangeObj.isHome = exchangeObj.isHome ? "Yes" : "No";
        const person = await getExchangeUserData(exchange.user_id);

        console.log("person", person);

        exchangeObj.username = person?.full_name ? person?.full_name : null;
        delete exchangeObj.user_id;
        return exchangeObj;
      })
    );

    res.json(exchangesWithUsername);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const placeBet = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log

    const user = await User.findOne({ _id: req.body.user_id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const personData2 = await getUserData(user);
    console.log("personData2", personData2);

    const updateballance = await Wallet.findOneAndUpdate(
      { user: req.body.user_id },
      { $inc: { balance: -req.body.stake } }, // decrement balance by stake
      { new: true } // return the new user object
    );

    const savedExchanges = await Exchange.insertMany(req.body);

    if (savedExchanges) {
      res.json({
        status: true,
        message: "Bet placed successfully",
        data: savedExchanges,
        wasUpdated: true,
      });
    } else {
      console.log("Update failed for unknown reasons"); // Debug log
      res.json({
        status: false,
        message: "User not updated for some reason",
        wasUpdated: false,
      });
    }
  } catch (err) {
    console.error("An error occurred:", err); // More detailed error log
    res.status(500).json({ message: err.message });
  }
};

export { getAllUsers, placeBet, getAllExchangeData };
