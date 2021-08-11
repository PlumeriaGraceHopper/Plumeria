// import React from "react";
// import { withRouter, Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { fetchCart, removeItemFromCart } from "../store/cart";
// import { fetchFlowers } from "../store/allFlowers";

// import { me } from "../store";

// // export class Cart extends React.Component {

// //   componentDidMount() {
// //     //this.props.getCart(window.localStorage.token);
// //     this.props.getFlowers();
// //     console.log('in CDM', this.props)
// //   }

// //   handleSubmit(event, id) {
// //     event.preventDefault()
// //     this.props.removeItem(id)
// //   }

// //   getTotalPrice(){
// //     let total = 0

// //     this.props.user.map(item => {
// //       return item.OrderDetails.map(detail => {
// //         let flower = this.props.flowers.filter(
// //           flower => flower.id === detail.flowerId
// //         );
// //         return (
// //           total += parseInt(flower.map(info => info.price).join(''))*parseInt(flower.map(info => info.quantity).join(''))
// //         );
// //       });
// //     })

// //     let dividedTotal = total/100

// //     let decimalTotal = dividedTotal.toLocaleString('en-us', {
// //       style: 'currency',
// //       currency: 'USD'
// //     })

// //     return decimalTotal
// //   }

// //   render() {
// //     console.log('PROPS IN CART:', this.props)
// //     const { isLoggedIn } = this.props;
// //     return (
// //       <div>
// //         <h1>your cart</h1>

// //         <table>
// //           <tbody>
// //             <tr>
// //               <td></td>
// //               <td>Flower</td>
// //               <td>Quantity</td>
// //               <td>Price</td>
// //               <td>Edit</td>
// //               <td>Remove Item</td>
// //             </tr>

// //             {/* {this.props.user.map(item => {
// //               return item.OrderDetails.map(detail => {
// //                 let flower = this.props.flowers.filter(
// //                   flower => flower.id === detail.flowerId
// //                 );
// //                 let quantity = detail.quantity;
// //                 return (
// //                   <tr key={detail.id}>
// //                     <td>
// //                       {flower.map(info => (
// //                         <img className="orderImage" src={info.image} />
// //                       ))}
// //                     </td>
// //                     <td> {flower.map(info => info.name)}</td>
// //                     <td>{quantity}</td>
// //                     <td>${flower.map(info => info.price*info.quantity) / 100} @ {flower.map(info => info.price/100)} per unit </td>
// //                     <td>
// //                       <div>
// //                         <select name="quantity" id="quantity">
// //                           <option value="0">0</option>
// //                         </select>
// //                       </div>
// //                     </td>
// //                     <td>
// //                       <button onClick = {(e, id = detail.id) => {this.handleSubmit(e, id)}}> Delete Flower</button>
// //                     </td>
// //                   </tr>
// //                 );
// //               });
// //             })}
// //             <td></td>
// //             <td></td>
// //             <td></td>
// //             <td></td>
// //             <td colSpan="2" id="totalrow">
// //               Total: {this.getTotalPrice()}
// //             </td>
// //           </tbody>
// //         </table>

// //         {isLoggedIn ? (
// //           <Link to="/payment">
// //             <button className="button" type="button">Checkout</button>
// //           </Link>
// //         ) : (
// //           <Link to="/login">
// //             <button className="button" type="button">Sign In to Complete Order</button>
// //           </Link>
// //         )} */}
// //         </tbody>
// //         </table>
// //       </div>
// //     );
// //   }
// // }

// function Cart(props) {
//   console.log(props);

//   let imageUrlArray = []
//   let namesArray = [];
//   let quantityArray = [];
//   let priceArray = [];

//   if (props.cart.OrderDetails) {
//     props.cart.OrderDetails.map(detail => {
//       let flower = props.flowers.filter(
//         flower => flower.id === detail.flowerId
//       );
//       let flowerName = flower.map(i => i.name);
//       let flowerUserQuantity = detail.quantity;
//       let flowerPrice = flower.map(i => i.price / 100);
//       let flowerImageURL = flower.map(i => i.image)

//       namesArray.push(flowerName[0]);
//       quantityArray.push(flowerUserQuantity);
//       priceArray.push(flowerPrice[0]);
//       imageUrlArray.push(flowerImageURL[0])
//     });
//   } else {
//     console.log("No Cart Available in Props");
//   }

//   return (
//     <div>
//       <table>
//         <tbody>
//           <tr>
//             <td></td>
//             <td>Flower</td>
//             <td>Quantity</td>
//             <td>Price</td>
//             <td>Edit</td>
//             <td>Remove Item</td>
//           </tr>
//           <tr>
//             <td>{imageUrlArray.map(item=>{
//               return <img className="orderImage" src={item} />
//             })}</td>
//               <td>
//               {namesArray.map(item => <tr>{item}</tr>)}
//             </td>
//             <td>
//               {quantityArray.map(item => <tr>{item}</tr>)}
//             </td>
//             <td>
//               {priceArray.map(item => {
//                 return <tr>${item}/unit</tr>;
//               })}
//             </td>
//             {/* <td>
//               <select name="quantity" id="quantity">
//                 <option value="0">0</option>
//               </select>
//               <button>Update Quantity</button>
//             </td>
//             <td>
//               <button>
//                 Delete Flower
//               </button>
//             </td> */}
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const mapState = state => {
//   return {
//     cart: state.cart,
//     flowers: state.flowers,
//     isLoggedIn: !!state.auth.id,
//   };
// };

// const mapDispatch = dispatch => {
//   return {
//     getCart: id => {
//       dispatch(fetchCart(id));
//     },
//     getFlowers: () => {
//       dispatch(fetchFlowers());
//     },
//     loadInitialData() {
//       dispatch(me());
//     },
//     removeItem: orderDetailId => {
//       dispatch(removeItemFromCart(orderDetailId));
//     },
//   };
// };

// export default withRouter(connect(mapState, mapDispatch)(Cart));


//////////LET'S REFACTOR BC THAT'S INSANE AND DOESN'T REALLY WORK//////////
import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, removeItemFromCart } from "../store/cart";
import { fetchFlowers } from "../store/allFlowers";

import { me } from "../store";

// export class Cart extends React.Component {

//   componentDidMount() {
//     //this.props.getCart(window.localStorage.token);
//     this.props.getFlowers();
//     console.log('in CDM', this.props)
//   }

//   handleSubmit(event, id) {
//     event.preventDefault()
//     this.props.removeItem(id)
//   }

//   getTotalPrice(){
//     let total = 0

//     this.props.user.map(item => {
//       return item.OrderDetails.map(detail => {
//         let flower = this.props.flowers.filter(
//           flower => flower.id === detail.flowerId
//         );
//         return (
//           total += parseInt(flower.map(info => info.price).join(''))*parseInt(flower.map(info => info.quantity).join(''))
//         );
//       });
//     })

//     let dividedTotal = total/100

//     let decimalTotal = dividedTotal.toLocaleString('en-us', {
//       style: 'currency',
//       currency: 'USD'
//     })

//     return decimalTotal
//   }

//   render() {
//     console.log('PROPS IN CART:', this.props)
//     const { isLoggedIn } = this.props;
//     return (
//       <div>
//         <h1>your cart</h1>

//         <table>
//           <tbody>
//             <tr>
//               <td></td>
//               <td>Flower</td>
//               <td>Quantity</td>
//               <td>Price</td>
//               <td>Edit</td>
//               <td>Remove Item</td>
//             </tr>

//             {/* {this.props.user.map(item => {
//               return item.OrderDetails.map(detail => {
//                 let flower = this.props.flowers.filter(
//                   flower => flower.id === detail.flowerId
//                 );
//                 let quantity = detail.quantity;
//                 return (
//                   <tr key={detail.id}>
//                     <td>
//                       {flower.map(info => (
//                         <img className="orderImage" src={info.image} />
//                       ))}
//                     </td>
//                     <td> {flower.map(info => info.name)}</td>
//                     <td>{quantity}</td>
//                     <td>${flower.map(info => info.price*info.quantity) / 100} @ {flower.map(info => info.price/100)} per unit </td>
//                     <td>
//                       <div>
//                         <select name="quantity" id="quantity">
//                           <option value="0">0</option>
//                         </select>
//                       </div>
//                     </td>
//                     <td>
//                       <button onClick = {(e, id = detail.id) => {this.handleSubmit(e, id)}}> Delete Flower</button>
//                     </td>
//                   </tr>
//                 );
//               });
//             })}
//             <td></td>
//             <td></td>
//             <td></td>
//             <td></td>
//             <td colSpan="2" id="totalrow">
//               Total: {this.getTotalPrice()}
//             </td>
//           </tbody>
//         </table>

//         {isLoggedIn ? (
//           <Link to="/payment">
//             <button className="button" type="button">Checkout</button>
//           </Link>
//         ) : (
//           <Link to="/login">
//             <button className="button" type="button">Sign In to Complete Order</button>
//           </Link>
//         )} */}
//         </tbody>
//         </table>
//       </div>
//     );
//   }
// }

function Cart(props) {
  console.log(props);

  // let imageUrlArray = []
  // let namesArray = [];
  // let quantityArray = [];
  // let priceArray = [];

  // if (props.cart.OrderDetails) {
  //   props.cart.OrderDetails.map(detail => {
  //     let flower = props.flowers.filter(
  //       flower => flower.id === detail.flowerId
  //     );
  //     let flowerName = flower.map(i => i.name);
  //     let flowerUserQuantity = detail.quantity;
  //     let flowerPrice = flower.map(i => i.price / 100);
  //     let flowerImageURL = flower.map(i => i.image)

  //     namesArray.push(flowerName[0]);
  //     quantityArray.push(flowerUserQuantity);
  //     priceArray.push(flowerPrice[0]);
  //     imageUrlArray.push(flowerImageURL[0])
  //   });
  // } else {
  //   console.log("No Cart Available in Props");
  // }

  const [value, setValue] = useState(1);
  //setValue(value + 1)  <--- use to re-render


return (
    <div>
      {props.cart.id
      ? props.cart.OrderDetails.map(detail => {
        let flower = props.flowers.filter(
          flower => flower.id === detail.flowerId
        );
        let quantity = detail.quantity;
        return (
          <tr key={detail.id}>
            <td>
              {flower.map(info => (
                <img className="orderImage" src={info.image} />
              ))}
            </td>
            <td> {flower.map(info => info.name)}</td>
            <td>{quantity}</td>
            <td>${flower.map(info => info.price*info.quantity) / 100} @ {flower.map(info => info.price/100)} per unit </td>
            <td>
              <div>
                <select name="quantity" id="quantity">
                  <option value="0">0</option>
                </select>
              </div>
            </td>
            <td>
              <button> Delete Flower</button>
            </td>
          </tr>
        );
      })
    : console.log('props.cart.id is falsey', props.cart) }
    </div>
  );
}

const mapState = state => {
  return {
    cart: state.cart,
    flowers: state.flowers,
    isLoggedIn: !!state.auth.id,
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
    removeItem: orderDetailId => {
      dispatch(removeItemFromCart(orderDetailId));
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Cart));
