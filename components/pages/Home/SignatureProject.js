"use client";
import Button from "@/components/Button";
import ProjectsContainer from "@/components/ProjectsContainer";
import SectionHeader from "@/components/SectionHeader";
import { signProjects } from "@/lib/content";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";
import ProjectsCarousel from "./ProjectsCarousel";

export default function SignatureProject({projects, imagePath}) {
  return (
    <div className="relative w-full pb-15 ms:pb-20 lg:pb-[100px]">
      <SectionHeader heading="Iconic" spanText="Masterpiece"/>
      <div className="relative w-full mx-auto flex-center flex-col" >
        <ProjectsCarousel projects={projects} imagePath={imagePath}/>
        <Button text="View All Projects" link="/projects"/>
      </div>
    </div>
  );
}
