import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { fetchFlowers } from "../store/allFlowers";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, Button, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { me } from "../store";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export function GuestCart(props) {
  let guestCart = JSON.parse(localStorage.getItem("cart"));

  //using this as a workaround to get the delete button to re-render the page
  const [value, setValue] = useState(1);

  function getTotalPrice() {
    let total = 0;

    guestCart.map(item => {
      let flowerPrice = item.price;
      total += flowerPrice * item.quantity;
    });

    let dividedTotal = total / 100;
    let decimalTotal = dividedTotal.toLocaleString("en-us", {
      style: "currency",
      currency: "USD",
    });
    return decimalTotal;
  }

  const [selectedQuantity, setSelectedQuantity] = useState([1]);

  function handleChange(e) {
    setSelectedQuantity(e.target.value);
  }

  return guestCart === null ? (
    <Box m={50}>
      <Typography> "No items in cart."</Typography>
    </Box>
  ) : (
    <Box m={50}>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right">Flower Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Remove Item</StyledTableCell>
            </TableRow>
          </TableHead>
          {guestCart.map((info, idx) => {
            //This for loop and renderQuant variable are to put the amount the user has in their cart into the editable dropdown
            let quantityArr = [];
            for (let i = 1; i <= info.totalStock; i++) {
              quantityArr.push(i);
            }

            let renderQuant = quantityArr.map(num => (
              <option value={num}>{num}</option>
            ));

            return (
              <TableBody>
                <StyledTableRow key={info.name}>
                  <StyledTableCell component="th" scope="row">
                    <Link to={`/flowers/${info.id}`}>
                      <img className="orderImage" src={info.image} />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Link to={`/flowers/${info.id}`}>{info.name}</Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {info.quantity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    ${(info.price * info.quantity) / 100} @ ${info.price / 100}{" "}
                    per unit
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <select
                      key={info.id}
                      name="selectedQuantity"
                      value={selectedQuantity}
                      onChange={e => handleChange(e)}
                    >
                      {renderQuant}
                    </select>
                    <Button
                      onClick={() => {
                        if (info.quantity === selectedQuantity) {
                          return;
                        }

                        guestCart.push({
                          id: info.id,
                          image: info.image,
                          name: info.name,
                          price: info.price,
                          quantity: selectedQuantity,
                          totalStock: info.totalStock,
                        });
                        guestCart.splice(idx, 1);
                        localStorage.setItem("cart", JSON.stringify(guestCart));
                        setValue(value + 1);
                      }}
                    >
                      Update Quantity
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <button
                      type="button"
                      onClick={() => {
                        guestCart.splice(idx, 1);
                        localStorage.setItem("cart", JSON.stringify(guestCart));
                        setValue(value + 1);
                      }}
                    >
                      <DeleteForeverIcon />
                    </button>
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            );
          })}
          <Typography>Total: {getTotalPrice()}</Typography>
        </Table>
      </TableContainer>
      <Link to="/login">
        <Button className="button" type="button">
          Log In to Complete Order
        </Button>
        {/* This should be done on the login page - if there is cart in local storage, add it to our database cart! This should also happen if they sign up. */}
      </Link>
    </Box>
  );
}

export default GuestCart;
