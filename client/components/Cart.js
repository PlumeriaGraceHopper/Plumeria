import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCart,
  removeItemFromCart,
  fetchUpdateFlower,
} from "../store/cart";
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
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

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

function Cart(props) {
  const [value, setValue] = useState(1);
  //setValue(value + 1)  <--- use to re-render

  const [selectedQuantity, setSelectedQuantity] = useState([1]);

  function handleChange(e) {
    setSelectedQuantity(e.target.value);
  }

  function handleSubmitQuantity(e, token, orderDetailId, quant) {
    e.preventDefault();
    props.updateItem(token, orderDetailId, quant);
    setValue(value + 1);
  }

  function handleSubmitDelete(e, token, orderDetailId) {
    e.preventDefault();
    props.removeItem(token, orderDetailId);
    setValue(value + 1);
  }

  //handleSubmit WORKS in that it hits the PUT route, but it's giving me a 401 Unauthorized error.

  return (
    <Box m={50}>
      <div>
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

            {props.cart.id
              ? props.cart.OrderDetails.map(detail => {
                  let flower = props.flowers.filter(
                    flower => flower.id === detail.flowerId
                  );
                  let quantity = detail.quantity;
                  let orderDetail = detail.id;

                  //quantityArr and renderQuant deal with the Update Quantity dropdown:
                  let quantityArr = [];
                  for (let i = 1; i <= flower.map(i => i.quantity); i++) {
                    quantityArr.push(i);
                  }

                  let renderQuant = quantityArr.map(num => (
                    <option value={num}>{num}</option>
                  ));

                  return (
                    // <tr key={detail.id}>
                    //   <td>
                    //     {flower.map(info => (
                    //       <img className="orderImage" src={info.image} />
                    //     ))}
                    //   </td>
                    //   <td> {flower.map(info => info.name)}</td>
                    //   <td>{quantity}</td>
                    //   <td>
                    //     ${flower.map(info => info.price * info.quantity) / 100} @
                    //     {flower.map(info => info.price / 100)} per unit
                    //   </td>
                    //   <td>
                    //
                    //   </td>
                    //   <td>
                    //     <button onClick={(e, token = (window.localStorage.token), orderDetailId = orderDetail) => handleSubmitDelete(e, token, orderDetailId)}> Delete Flower</button>
                    //   </td>
                    // </tr>

                    <TableBody>
                      {flower.map(info => (
                        <StyledTableRow key={info.name}>
                          <StyledTableCell component="th" scope="row">
                            <Link to={`/flowers/${info.id}`}><img className="orderImage" src={info.image} /></Link>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                          <Link to={`/flowers/${info.id}`}>{info.name}</Link>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {info.quantity}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            ${(info.price * info.quantity) / 100} @ $
                            {info.price / 100} per unit
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <div>
                              <select
                                key={detail.id}
                                name="selectedQuantity"
                                value={selectedQuantity}
                                onChange={e => handleChange(e)}
                              >
                                {renderQuant}
                              </select>
                              <Button
                                onClick={(
                                  e,
                                  token = window.localStorage.token,
                                  orderDetailId = detail.id,
                                  quant = selectedQuantity
                                ) =>
                                  handleSubmitQuantity(
                                    e,
                                    token,
                                    orderDetailId,
                                    quant
                                  )
                                }
                              >
                                Update Quantity
                              </Button>
                            </div>
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            <Button
                              onClick={(
                                e,
                                token = window.localStorage.token,
                                orderDetailId = orderDetail
                              ) => handleSubmitDelete(e, token, orderDetailId)}
                            >
                              <DeleteForeverIcon />
                            </Button>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  );
                })
              : "Cart Cannot Be Found."}
          </Table>
        </TableContainer>
        <Typography>Total: $0.00 (placeholder)</Typography>
        <Button href="/payment">Checkout</Button>
      </div>
    </Box>
  );
}

const mapState = state => {
  return {
    cart: state.cart,
    flowers: state.flowers,
  };
};

const mapDispatch = dispatch => {
  return {
    getCart: id => {
      dispatch(fetchCart(id));
    },
    getFlowers: () => {
      dispatch(fetchFlowers());
    },
    loadInitialData() {
      dispatch(me());
    },
    removeItem: (token, orderDetailId) => {
      dispatch(removeItemFromCart(token, orderDetailId));
    },
    updateItem: (token, orderDetail, quantity) => {
      dispatch(fetchUpdateFlower(token, orderDetail, quantity));
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));

//GET TOTAL FUNCTION CODE For my reference:
// let total = 0;

// props.cart.OrderDetails.map(detail => {
//   let flower = props.flowers.filter(
//     flower => flower.id === detail.flowerId
//   );

//   let quantity = detail.quantity;
//   let flowerPrice = flower.map(i => i.price)

//   let subTotal = quantity * flowerPrice
//   total += subTotal
//   })

//     let dividedTotal = total / 100;

//     let decimalTotal = dividedTotal.toLocaleString("en-us", {
//       style: "currency",
//       currency: "USD",
//     });

//     return decimalTotal;
