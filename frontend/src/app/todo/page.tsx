"use client";

import {
  Icon,
  Tooltip,
  Heading,
  Button,
  Text,
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginForm } from "@/utils/forms/loginForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { MdEditDocument } from "react-icons/md";
import EditTodo from "@/components/EditTodo";

import { MdDelete } from "react-icons/md";

export default function Todo() {
  const [todos, setTodos] = useState<any>();

  const [editTodoData, setEditTodoData] = useState<any>();

  const [editingTodo, setEditingTodo] = useState<boolean>(false);

  const getUserTodos = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get("http://localhost:5000/api/todos/", {
        headers: {
          "auth-token": accessToken,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, []);

  const editATodo = (todoId: string) => {
    const todo = todos.filter((el: any) => el._id === todoId);
    setEditTodoData(todo);
    setEditingTodo(true);
  };

  const deleteATodo = async (todoId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/todos/${todoId}`,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      getUserTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar getUserTodos={getUserTodos} />
      <Flex
        mt="12"
        mb="20"
        h="fit-content"
        justify={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Text color="white" fontSize={"4xl"} fontWeight={"semibold"}>
          Todo do do du du....
        </Text>
        {todos &&
          todos.length > 0 &&
          todos.map((todo: any) => (
            <Card maxW="lg" mt="4">
              <CardHeader>
                <Flex justifyContent={"space-between"}>
                  <Heading size="lg">{todo.title}</Heading>
                  <Flex gap="2">
                    <Tooltip hasArrow label="Edit" bg="gray.300" color="black">
                      <Button
                        bgColor={"transparent"}
                        _hover={{
                          bgColor: "transparent",
                        }}
                        p="0"
                        cursor={"pointer"}
                        onClick={() => editATodo(todo._id)}
                      >
                        <Icon
                          as={MdEditDocument}
                          color="black"
                          zIndex={50}
                          boxSize="6"
                        />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      hasArrow
                      label="Delete"
                      bg="gray.300"
                      color="black"
                    >
                      <Button
                        bgColor={"transparent"}
                        _hover={{
                          bgColor: "transparent",
                        }}
                        p="0"
                        cursor={"pointer"}
                        onClick={() => deleteATodo(todo._id)}
                      >
                        <Icon
                          as={MdDelete}
                          color="black"
                          zIndex={50}
                          boxSize="6"
                        />
                      </Button>
                    </Tooltip>
                  </Flex>
                </Flex>
              </CardHeader>
              {/* <CardBody>
                <Text>{todo.task}</Text>
              </CardBody> */}
            </Card>
          ))}
      </Flex>
      {editTodoData && editTodoData.length > 0 && (
        <EditTodo
          editingTodo={editingTodo}
          getUserTodos={getUserTodos}
          editTodoData={editTodoData}
          setEditingTodo={setEditingTodo}
        />
      )}
    </>
  );
}
