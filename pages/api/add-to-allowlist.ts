import type { NextApiRequest, NextApiResponse } from "next";
import { table } from "../../utils/Airtable";
import styles from "../styles/Home.module.css";
import React from "react";


const addToAllowlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address } = JSON.parse(req.body);

  const record = await table
    .select({
      fields: ["Addresses", "Minted"],
      filterByFormula: `NOT({Addresses} != '${address}')`,
    })
    .all();

  if (record.length > 0) {
    res.status(400).json({
      success: false,
      error: "User is already in the AirDrop list",
    });
  }

  if (record.length === 0) {
    try {
      await table.create([
        {
          fields: {
            Addresses: address,
          },
        },
      ]);
      res.status(200).json({
        success: true,
        message: "User added to the AirDrop list",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  }
};


export default addToAllowlist;

