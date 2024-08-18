const Storage = (cartItems) => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems: []));
        //Si queremos que los datos al cerrar la pestaña se no se eliminen se coloca localStorage con este si duplicamos la pestaña persistira la info y no se eliminara

}

export const CartReducer = (state, action) => {

  let index = -1;
  if (action.payload)
    index = state.cartItems.findIndex(x => x.id === action.payload.id);
  
  let newItems = [...state.cartItems];

  switch (action.type) {
    case "ADD":
    case "INCQTY":
      if (index === -1) {
        //state.cartItems.push({ ...action.payload, quantity: 1 }); // BAD WAY
        newItems.push({ ...action.payload, quantity: 1 }); // GOOD WAY
      }
      else {
        newItems[index].quantity+=0.5;
        //state.cartItems[index].quantity++;
      }
      break;
  
    case "REMOVE":
      if (index > -1) {
        //state.cartItems.splice(index, 1); // BAD WAY
        newItems = state.cartItems.filter(x => x.id !== action.payload.id); // GOOD WAY
      }
      break;
       
    case "DECQTY":
      if (index > -1) {
        if (newItems[index].quantity > 1)
          newItems[index].quantity-=0.5;
        //state.cartItems[index].quantity--;
      }
      break;
    
    case "CLEAR":
      newItems = [];
      break;
      
    default:
  }

  state.cartItems = newItems;
  Storage(newItems);

  return state;

}