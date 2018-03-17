import React, { Component } from "react";
import SearchForm from "../Components/Forms/SearchForm";
import { ProductCardMin } from "../Components/Items/ProductCard";
import { Modal, ModalLauncher } from "../Components/Misc/Modal";
import logo from "../logo.svg";
import {
  ProductForm,
  CategoryForm
} from "../Components/Forms/AccountForm";

export default function AdminPage() {
  return (
    <div className={'container-fluid'}>
      <div className={"row"}>
        <div className={"col-lg-3"}>
          <div className={"card bg-light"} style={{ border: 0, height: '100%' }}>
            <div className={"card-body"}>Here comes the menu</div>
          </div>
        </div>
        <div className={"col-lg-9"}>
          <div className={"card"} style={{ border: 0 }}>
            <div className="card-body">
              {/* Card item */}
              <div className={"card"} style={{ border: 0 }}>
                <div className="card-body bg-dark">
                  <ProductInfo src={logo} price="0.01">
                    This product will make me millions
                  </ProductInfo>
                </div>
                <div
                  className={"card-footer text-center"}
                  style={{ border: 0, backgroundColor: 'white' }}
                >
                <div className={'btn-group'}>
                <ModalLauncher
                    target={"modal"}
                    className={"btn btn-dark"}
                  >
                    Update
                  </ModalLauncher>
                  <Modal title={"Product"} id={"modal"} center>
                    <CategoryForm />
                  </Modal>
                  <button className={"btn btn-danger"}>
                    Remove
                  </button>
                  </div>
                </div>
              </div>

              {/* Card item */}
              <div className={"card"} style={{ border: 0 }}>
                <div className="card-body bg-dark">
                  <ProductInfo src={logo} price="0.01">
                    This product will make me millions
                  </ProductInfo>
                </div>
                <div
                  className={"card-footer text-center"}
                  style={{ border: 0, backgroundColor: 'white' }}
                >
                <div className={'btn-group'}>
                  <button className={"btn btn-dark"}>
                    Update
                  </button>
                  <button className={"btn btn-danger"}>
                    Remove
                  </button>
                  </div>
                </div>
              </div>

              {/* Card item */}
              <div className={"card"} style={{ border: 0 }}>
                <div className="card-body bg-dark">
                  <ProductInfo src={logo} price="0.01">
                    This product will make me millions
                  </ProductInfo>
                </div>
                <div
                  className={"card-footer text-center"}
                  style={{ border: 0, backgroundColor: 'white' }}
                >
                <div className={'btn-group'}>
                  <button className={"btn btn-dark"}>
                    Update
                  </button>
                  <button className={"btn btn-danger"}>
                    Remove
                  </button>
                  </div>
                </div>
              </div>

              {/* Card item */}
              <div className={"card"} style={{ border: 0 }}>
                <div className="card-body bg-dark">
                <CloseButton />
                  <ProductInfo src={logo} price="0.01">
                    This product will make me millions
                  </ProductInfo>
                </div>
                <div
                  className={"card-footer text-center"}
                  style={{ border: 0, backgroundColor: 'white' }}
                >
                <div className={'btn-group'}>
                  <button className={"btn btn-dark"}>
                    Update
                  </button>
                  <button className={"btn btn-danger"}>
                    Remove
                  </button>
                  </div>
                </div>
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
      style={{ borderRadius: 0 }}
      type={"button"}
      className={"btn btn-light"}
    >
      Add to cart
    </button>
  );

  let modalContent = (
    <ProductInfo name={"product"} src={logo} price={`1,00`}>
      <p className={"text-muted"}>This is the descrption.</p>
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
      <div className={"col-md-3"}>
        <img src={props.src} alt={props.name} />
      </div>
      <div className={"col-md-9"}>
        <p className={"text-muted"}>{props.children}</p>
        <span className={"text-secondary"}>&euro;{props.price}</span>
      </div>
    </div>
  );
}

function CloseButton() {
  return (
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
