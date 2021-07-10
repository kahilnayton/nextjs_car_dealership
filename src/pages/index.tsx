import { GetServerSideProps } from "next";
import { getMakes, Make } from "../database/getMakes";
import { Formik, Form } from "formik";
import { Paper } from "@material-ui/core";
import { Grid } from "@material-ui/core";

export interface HomeProps {
  makes: Make[];
}

export default function Home({ makes }: HomeProps) {
  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {(values) => (
        <Form>
          <Paper elevation={5}>
            <Grid container>
              <Grid xs={12} sm={6} item>
                MAKE
              </Grid>
              <Grid xs={12} sm={6} item>
                MODEL
              </Grid>
              <Grid xs={12} sm={6} item>
                MIN
              </Grid>
              <Grid xs={12} sm={6} item>
                MAX
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const makes = await getMakes();
  return { props: { makes } };
};
