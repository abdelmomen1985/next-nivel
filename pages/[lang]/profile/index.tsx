import { useQuery } from "@apollo/client";
import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import LoadingCircle from "../../../components/common/LoadingCircle";
import { getRemoteSchemaUrl } from "../../../data/remoteSchemaUrl";
import Layout from "../../../Layouts/Layout";
import { initializeApollo } from "../../../lib/apolloClient";
import { LOAD_PROFILE_LAYOUT } from "../../../query/profile";
import { GET_USER_BOOKINGS_BY_USER_ID } from "../../../query/user";
import { BookingType } from "../../../types/booking";
import { LayoutType } from "../../../types/layout";
import ProfileHero from "./../../../components/profile/ProfileHero";
import ProfileTabs from "./../../../components/profile/ProfileTabs";
import AccountSettings from "./../../../components/profile/ProfileTabs/AccountSettings";
import PersonalInfo from "./../../../components/profile/ProfileTabs/PersonalInfo";
import UserBookings from "./../../../components/profile/ProfileTabs/UserBookings";
// import { initializeApollo } from './../../../lib/apolloClient';
import { AppContext } from "./../../../context/AppContext";
import { getLocalizationProps } from "./../../../context/LangContext";

const ProfilePage = ({ layout }: { layout: LayoutType }) => {
  const { user } = useContext(AppContext);
  const [currentTap, setCurrentTap] = useState<number>(1);
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const { data, loading } = useQuery(GET_USER_BOOKINGS_BY_USER_ID, {
    variables: {
      visitor_id: user?.id,
    },
    fetchPolicy: "no-cache",

    onCompleted() {
      console.log(data);
      setBookings(data?.bookings);
    },
    onError(err) {
      console.log(err);
    },
  });
  // useEffect(() => {}, [])
  return (
    <Layout layout={layout}>
      {loading && <LoadingCircle width="300px" margin="50px auto" />}
      {data && user && (
        <>
          <ProfileHero />
          <ProfileTabs currentTap={currentTap} setCurrentTap={setCurrentTap}>
            {currentTap === 1 && <AccountSettings />}
            {currentTap === 2 && (
              <UserBookings bookings={bookings} setBookings={setBookings} />
            )}
            {currentTap === 3 && <PersonalInfo />}
            {/* {currentTap === 3 && <AccountSettings />} */}
          </ProfileTabs>
        </>
      )}
    </Layout>
  );
};

export default ProfilePage;

export const getAnyProps = async (ctx: any) => {
  const localization = getLocalizationProps(ctx, "common");
  const remoteSchemaUrl = await getRemoteSchemaUrl();
  const client = initializeApollo();
  const resp = await client.query({ query: LOAD_PROFILE_LAYOUT });
  return {
    props: {
      localization,
      remoteSchemaUrl,
      layout: { ...resp?.data?.layout, remoteSchemaUrl },
    },
  };
};

/*
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ["ar", "en"].map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx) => {
  return await getAnyProps(ctx);
};
*/

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return await getAnyProps(ctx);
};
