import Layout from '../components/Layout';

export default function About() {
  const meta = {
    title: 'about – dsmtech'
  };

  return (
    <Layout meta={meta}>
      <article className="prose lg:prose-xl px-8">
        <h2>about dsmtech</h2>
        <p>
          When <a href="https://leerob.io">Lee Robinson</a> set out to find a
          new job as a developer in the Des Moines area, he started to research
          companies and create pros/cons lists. During this process, he realized
          there wasn't a central hub listing out all the tech companies and jobs
          in the greater DSM area and saw others asking for the same thing.
        </p>
        <p>
          He decided to create dsmtech.io - the easiest way to find tech
          companies and jobs in the Des Moines area. It started as a small list
          of 15 public, private, and startups in the area. Since then, it's
          tripled it's company list and helped people across the state of Iowa
          land tech jobs. dsmtech was featured in&nbsp;
          <a href="https://innovationia.com/2019/01/03/dsmtech-io-launches-for-tech-job-seekers-scouting-des-moines/">
            Innovation Iowa.
          </a>
        </p>
        <p>
          If you have any ideas on how to make this better, please let me know.
          Also, if you see any information that is incorrect or know of any
          companies that are missing, please create an issue or open a pull
          request.
        </p>
      </article>
    </Layout>
  );
}
