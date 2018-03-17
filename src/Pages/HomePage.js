import React, { Component } from "react";
import SearchForm from "../Components/Forms/SearchForm";
import { ProductCardMin } from "../Components/Items/ProductCard";
import { Modal, ModalLauncher } from "../Components/Misc/Modal";
import logo from "../logo.svg";

export default function HomePage(props) {
  // console.log(props.service)

  return (
    <div>
      <div className={"jumbotron jumbotron-fluid bg-dark"}>
        <div className={"container"}>
          <h1 className="font-weight-light text-light">Hello, world!</h1>
          <div className={'row'}>
          <div className={'col-lg-10 col-sm-10'}>
            <p className="font-weight-light text-light">
              This is a simple hero unit, a simple jumbotron-style component for
              calling extra attention to featured content or information.            
            </p>
          </div>
          <div className={'col-lg-2 col-sm-2'}>
          <img src={logo} alt={'product'} />
          </div>
          </div>
          <hr className="my-4" style={{ borderColor: "" }} />
        </div>
        <div className={"col-lg-6"} style={{ margin: "auto" }}>
          <SearchForm />
        </div>
      </div>
      <div className={"container"}>
        <div className={"row"}>
          <div className={"col-lg-3"} style={{ marginTop: 10 }}>
            <div className={"card"}>
              <div className={"card-body"}>Here comes the menu</div>
            </div>
          </div>
          <div className={"col-lg-9"}>
            <div className={"row"}>
              <div className={"col-lg-4"}>
                <CatalogItem />
              </div>
              <div className={"col-lg-4"}>
                <CatalogItem />
              </div>
              <div className={"col-lg-4"}>
                <CatalogItem />
              </div>
              <div className={"col-lg-4"} style={{ marginTop: 10 }}>
                <CatalogItem />
              </div>
              <div className={"col-lg-4"} style={{ marginTop: 10 }}>
                <CatalogItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountItem(props) {
  return (
    <div className={"card bg-light"} style={{ border: 0 }}>
      {props.children}
    </div>
  );
}

function CatalogItem() {
  let moreInfoButton = (
    <ModalLauncher target={"modal"} className={"btn btn-light btn-block"}>
      More info
    </ModalLauncher>
  );
  let modalAction = (
    <button
      type={"button"}
      className={"btn btn-info"}
    >
      Add to cart
    </button>
  );

  let modalContent = (
    <ProductInfo name={"product"} src={logo} price={`1,00`}>
      <p className={"text-light"}>This is the descrption.</p>
    </ProductInfo>
  );

  return (
    <div>
      <ProductCardMin price={"0,00"} actions={moreInfoButton} />
      <Modal
        title={"Product name"}
        id={"modal"}
        actions={modalAction}
        large
        center
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function ProductInfo(props) {
  return (
    <div className={"row"}>
      <div className={"col-md-6"}>
        <img src={props.src} alt={props.name} />
      </div>
      <div className={"col-md-6"}>
        <p className={"text-muted"}>{props.children}</p>
        <span className={"text-info"}>&euro;{props.price}</span>
      </div>
    </div>
  );
}
