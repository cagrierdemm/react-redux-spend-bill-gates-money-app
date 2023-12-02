import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { buy, sell } from '../redux/money/moneySlice';
import ScrollToTop from 'react-scroll-to-top';

function Home() {
  const items = useSelector((state) => state.items);
  const money = useSelector((state) => state.money);
  const basket = useSelector(state => state.basket);
  const total = useSelector(state => state.total);

  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    const updatedCount = Number(item.count) + 1;
    dispatch(buy({ id: item.id, productPrice: item.productPrice, productName: item.productName, count: updatedCount }));
  }

  const handleDiscrement = (item) => {
    const updatedCount = Number(item.count) - 1;
    dispatch(sell({ id: item.id, productPrice: item.productPrice, productName: item.productName, count: updatedCount }));
  }

  // const count = useSelector(state => state)
  return (
    <div className='container-fluid p-0'>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <div className="navbar-brand my-2 fw-bold fs-4 mx-auto mx-md-0"><img className='rounded-circle me-4' src='https://neal.fun/spend/billgates.jpg' alt='Bill Gates' width={80} />Spend Bill Gates' Money</div>
          <div className="navbar-brand my-3 mx-auto mx-md-0">
            <a href='https://github.com/cagrierdemm'><img className='me-3 logo' src='./github.png' alt='Github Logo' width={40} /></a>
            <a href='https://www.linkedin.com/in/cagrierdemm/'><img className='logo' src='./linkedin.png' alt='Linkedin Logo' width={40} /></a>
          </div>
        </div>
      </nav>
      <div className='container'>
        <div className='text-center sticky-top mt-4 bg-success text-light py-4 rounded-4 '>
          <h1>${money.toLocaleString('en-US')}</h1>
        </div>
        {basket.length > 0 && <div className='text-center bg-body-tertiary mt-4 rounded-4 col-md-6  col-12 mx-auto animation'>
          <h2 className='mt-3 p-3'>Your Receipt</h2>
          <h6 className='mt-3 mx-auto' style={{maxWidth: "400px"}}>{basket.map((item, index) => (
            <div className='row mt-1' key={index}><div className='col-6 fw-light text-start'>{item.productName}</div><div className=' col-1 fw-bold'> x{item.count}</div><div className='col-5 text-success text-end fw-bold'>${(item.productPrice*item.count).toLocaleString('en-US')}</div>  </div>
          ))}<hr className='w-100 mx-auto mt-4' />
          <div className='row pb-3'>
            <div className='col-6 text-start'><h4>TOTAL:</h4></div> <div className='text-end col-6'><h4 className='text-success fw-bold'>${total.toLocaleString('en-US')}</h4></div>
          </div>
            
          </h6>

        </div>}
        <div className='row mt-3 text-center mx-auto justify-content-center'>
          {items.map((item => (
            <div key={item.id} className="card box rounded-4 mx-auto mx-md-3 my-3 border-0" style={{ maxWidth: "260px" }}>
              <img src={item.image} className="card-img-top align-center p-3 mx-auto" alt="..." style={{ width: "70%", height: "70%", objectFit: "contain", maxHeight: "180px" }} />
              <div className="card-body">
                <h5 className="card-title">{item.productName}</h5>
                <h5 className="card-text text-success pb-1">${item.productPrice}</h5>
                <div className='row'>
                  <div className='container'>
                    <button onClick={() => handleDiscrement(item)}className={item.count > 0 ? `btn btn-danger rounded-3 col me-2` : `btn btn-secondary rounded-3 col me-2`}>-</button>
                    <input className='w-25 me-2 text-center' value={item.count} readOnly/>
                    <button onClick={() => handleIncrement(item)} className="btn btn-success rounded-3 col">+</button>
                  </div>
                </div>
              </div>
            </div>
          )))}
        </div>
      </div>
      <ScrollToTop smooth color="#000000" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} width='20' height='20' />
    </div>
  )
}

export default Home

