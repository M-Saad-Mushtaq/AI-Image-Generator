import React, { isValidElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./buttons/button";
import TextInput from "./Input/TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateAIImage } from "../api/index.js";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;
const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const ImgGenForm = ({
  post,
  setPost,
  createPostLoading,
  setCreatePostLoading,
  genImgLoading,
  setGenImgLoading,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const genImgFun = async () => {
    setGenImgLoading(true);
    await GenerateAIImage({ prompt: post.prompt })
      .then((res) => {
        setPost({
          ...post,
          photo: `data:image/jpeg;base64,${res?.data?.photo}`,
        });

        setGenImgLoading(false);
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setGenImgLoading(false);
      });
  };
  const createPostFun = async () => {
    setCreatePostLoading(true);
    setError("");
    await CreatePost(post)
      .then((res) => {
        setCreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setError(error?.response?.data?.message);
        setCreatePostLoading(false);
      });
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with prompt</Title>
        <Desc>Write prompt for the image you want to generate!</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Write your name . . ."
          name="name"
          value={post.author}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Description of image you want to generate . . ."
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        ** You can share AI Generated image with the Community **
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          flex
          leftIcon={<AutoAwesome />}
          isLoading={genImgLoading}
          isDisabled={post.prompt === ""}
          onClick={() => genImgFun()}
        />
        <Button
          text="Post Image"
          flex
          type="secondary"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={() => createPostFun()}
        />
      </Actions>
    </Form>
  );
};

export default ImgGenForm;
