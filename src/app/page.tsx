"use client"
import AddTodo from "@/components/add-todo";
import { Todos } from "@/components/todos";
import Navbar from "@/components/navbar";
import "./globals.css";
import { RiTodoLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
// thapa technical SUBSCRIBE
const Page = () => {
  const router = useRouter();
  return (
    <>
      <main>
        <h2><RiTodoLine className="icons" /> TODO NEXT + TYPESCRIPT <RiTodoLine className="icons" /> </h2>
        <Navbar />
        <AddTodo />
        <Todos />

      <h1 onClick={()=>router.push("/chart")} className="cursor-pointer">Explore Chart</h1>
      </main>
    </>
  );
};

export default Page;