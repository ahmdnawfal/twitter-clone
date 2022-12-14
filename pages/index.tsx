import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import { Tweet } from "../typings";
import { fetchTweets } from "../utils/fetchTweets";

interface Props {
  tweets: Tweet[];
}

const Home = ({ tweets }: Props) => {
  return (
    <div className="mx-auto lg:max-w-6xl max-h-screen overflow-visible">
      <Head>
        <title>Twitter Clone</title>
      </Head>
      <main className="grid grid-cols-9">
        <Sidebar />

        <Feed tweets={tweets} />

        <Widgets />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets();

  return {
    props: {
      tweets,
    },
  };
};
