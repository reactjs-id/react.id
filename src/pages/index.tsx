import * as React from 'react';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import { colors } from '../styles/variables';
import { SiteMetadata, Edge, LeaningMaterial, GatsbyContentNode } from '../interfaces/gatsby';

import LearningCard from '../components/learning/LearningCard';
import HomepageSection from '../components/home/HomepageSection';
import Paragraph from '../components/ui/Paragraph';
import CTAButton from '../components/ui/CTAButton';
import Page from '../components/layout/Page';
import ArrowRightIcon from '../components/ui/ArrowRightIcon';
import PageWrapper from '../components/layout/PageWrapper';
import LearningCardGrid from '../components/learning/LearningCardGrid';
import LearningCTAButton from '../components/learning/LearningCTALink';

const LearningCTA = styled('div')`
  margin-top: 64px;
`;

interface IndexPageProps {
  data: {
    site: {
      siteMetadata: SiteMetadata;
    };
    learning: Edge<GatsbyContentNode<LeaningMaterial>>;
  };
}

function IndexPage({ data }: IndexPageProps) {
  const { site, learning } = data;
  const { siteMetadata } = site;

  const featuredMaterials = learning.edges.filter(({ node }) => node.featured);

  return (
    <PageWrapper>
      <Page>
        <Helmet>
          <title>
            {siteMetadata.title} &middot; {siteMetadata.tagline}
          </title>
        </Helmet>
        <HomepageSection
          headingColor={colors.lightBlue}
          heading="Selamat Datang"
          title="Komunitas Developer ReactJS Indonesia"
        >
          <Paragraph>
            ReactJS ID adalah komunitas para developer React dan React Native. Kami mengadakan ajang
            meetup setiap bulannya, dimana para developer React bertukar informasi mengenai React
            dan ekosistemnya.
          </Paragraph>
          <CTAButton
            light
            inline
            icon={<ArrowRightIcon />}
            href="https://www.meetup.com/reactindonesia/"
          >
            Bergabung
          </CTAButton>
        </HomepageSection>
        <HomepageSection
          alignRight
          backgroundColor="#f2f2f2"
          textColor={colors.gray08}
          headingColor={colors.gray08}
          imageSource="/images/rk-tshirt.jpg"
          imageAlt="ReactJS ID T-shirt"
          heading="Kabar Gembira!"
          title="Merchandise Resmi ReactJS Indonesia"
        >
          <Paragraph>
            Merchandise resmi ReactJS Indonesia kini tersedia berkat kerjasama oleh Rumah Komunitas.
            Klik link di bawah untuk mendapatkan <em>T-shirt</em> dan jaket ReactJS Indonesia.
          </Paragraph>
          <CTAButton
            dark
            inline
            icon={<ArrowRightIcon fill={colors.gray08} />}
            href="https://www.rumahkomunitas.com/react-indonesia"
          >
            Dapatkan Segera
          </CTAButton>
        </HomepageSection>
        <HomepageSection
          centered
          fullWidth
          backgroundColor={colors.lightBlue}
          textColor={colors.gray08}
          headingColor={colors.gray08}
          heading="Ingin Belajar React?"
          title="Materi Pembelajaran"
        >
          <Paragraph>
            Beberapa konsep React memang terlihat janggal, tapi diluar itu React sangat mudah untuk
            dipelajari dan dipahami, baik mereka yang sudah mahir dalam JavaScript modern ataupun
            yang baru saja memulai. Cobalah memulai dari salah satu materi di bawah.
          </Paragraph>
          <LearningCardGrid>
            {featuredMaterials.map(({ node }) => (
              <LearningCard key={node.id} heading={node.type} title={node.title} href={node.url}>
                <Paragraph>{node.description}</Paragraph>
              </LearningCard>
            ))}
          </LearningCardGrid>
          <LearningCTA>
            <LearningCTAButton to="/learning">
              <span>Lihat Selengkapnya</span>{' '}
              <span className="icon">
                <ArrowRightIcon />
              </span>
            </LearningCTAButton>
          </LearningCTA>
        </HomepageSection>
      </Page>
    </PageWrapper>
  );
}

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
        tagline
        description
      }
    }
    learning: allLearningJson {
      edges {
        node {
          id
          type
          title
          description
          url
          featured
        }
      }
    }
  }
`;
