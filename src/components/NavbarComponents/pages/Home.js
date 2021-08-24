import React from "react";
import "../../../App.css";
import { SliderData } from "../../data/SliderData";
import Hero from "../../Hero/Hero";

export default function Home() {
  return (
    <>
      <Hero slides={SliderData} />
    </>
  );
}
