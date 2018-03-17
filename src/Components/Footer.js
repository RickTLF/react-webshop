import React, { Component } from "react";

export default function Footer(props) {
  return (
    <footer id="footer" className="bg-dark">
      <div class="container py-5">
        <div class="row">
          <FooterColumn header={"Features"}>
            <FooterColumnItem href={'#'}>Cool stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>Something else</FooterColumnItem>
            <FooterColumnItem href={'#'}>Some more stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>idk</FooterColumnItem>
          </FooterColumn>

          <FooterColumn header={"Features"}>
            <FooterColumnItem href={'#'}>Cool stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>Something else</FooterColumnItem>
            <FooterColumnItem href={'#'}>Some more stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>idk</FooterColumnItem>
          </FooterColumn>

          <FooterColumn header={"Features"}>
            <FooterColumnItem href={'#'}>Cool stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>Something else</FooterColumnItem>
            <FooterColumnItem href={'#'}>Some more stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>idk</FooterColumnItem>
          </FooterColumn>

          <FooterColumn header={"Features"}>
            <FooterColumnItem href={'#'}>Cool stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>Something else</FooterColumnItem>
            <FooterColumnItem href={'#'}>Some more stuff</FooterColumnItem>
            <FooterColumnItem href={'#'}>idk</FooterColumnItem>
          </FooterColumn>
        </div>
      </div>
    </footer>
  );
}

function FooterColumnItem(props) {
  return (
    <li>
      <a class="text-muted" href={props.href}>
        {props.children}
      </a>
    </li>
  );
}

function FooterColumn(props) {
  return (
    <div class="col-6 col-md">
      <h5 className={"text-light"}>{props.header}</h5>
      <ul class="list-unstyled text-small">
        {props.children}
      </ul>
    </div>
  );
}
