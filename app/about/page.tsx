export default function AboutPage() {
  return (
    <article className="px-10 max-w-2xl">
      <h2 className="text-xl lg:text-2xl font-semibold mb-4">about dsmtech</h2>
      <p className="mb-4">
        When{' '}
        <a href="https://leerob.io" className="underline">
          Lee Robinson
        </a>{' '}
        set out to find a new job as a developer in the Des Moines area, he
        started to research companies and create pros/cons lists. During this
        process, he realized there wasn't a central hub listing out all the tech
        companies and jobs in the greater DSM area and saw others asking for the
        same thing.
      </p>
      <p className="mb-4">
        He decided to create dsmtech.io - the easiest way to find tech companies
        and jobs in the Des Moines area. It started as a small list of 15
        public, private, and startups in the area. Since then, it's tripled it's
        company list and helped people across the state of Iowa land tech jobs.
        dsmtech was featured in&nbsp;
        <a
          href="https://innovationia.com/2019/01/03/dsmtech-io-launches-for-tech-job-seekers-scouting-des-moines/"
          className="underline"
        >
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
  );
}
