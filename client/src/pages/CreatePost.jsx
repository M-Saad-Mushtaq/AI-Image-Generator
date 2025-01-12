import React, { useState } from "react";
import styled from "styled-components";
import ImgGenForm from "../components/ImgGenForm";
import ImgGen from "../components/ImgGen";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg}
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:center;
  gap: 20px;
  @media ( max-width: 768) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  gap: 8%;
  height: fit-content;
  padding: 32px 0px;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [genImgLoading, setGenImgLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <ImgGenForm
          post={post}
          setPost={setPost}
          createPostLoading={createPostLoading}
          setCreatePostLoading={setCreatePostLoading}
          genImgLoading={genImgLoading}
          setGenImgLoading={setGenImgLoading}
        />
        <ImgGen src={post?.photo} loading={genImgLoading} />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
