import Layout from '../components/Layout';
import { COMPANIES } from '../companies';

const formatFilePath = (name) => name.replace(/ /g, '_').toLowerCase();

const SocialMedia = (company) => {
  return (
    <div className="flex flex-row">
      <a
        className={!company.instagram ? 'opacity-50 cursor-not-allowed' : ''}
        disabled={!company.instagram}
        target="_blank"
        rel="noopener noreferrer"
        href={
          company.instagram
            ? `https://www.instagram.com/${company.instagram}`
            : null
        }
      >
        <span className="sr-only">{`${company.name} instagram`}</span>
        <svg
          className="w-4 mr-2"
          viewBox="0 0 24 24"
          fill="#E4405F"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913a5.885 5.885 0 0 0 1.384 2.126A5.868 5.868 0 0 0 4.14 23.37c.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558a5.898 5.898 0 0 0 2.126-1.384 5.86 5.86 0 0 0 1.384-2.126c.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913a5.89 5.89 0 0 0-1.384-2.126A5.847 5.847 0 0 0 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227a3.81 3.81 0 0 1-.899 1.382 3.744 3.744 0 0 1-1.38.896c-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421a3.716 3.716 0 0 1-1.379-.899 3.644 3.644 0 0 1-.9-1.38c-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
        </svg>
      </a>
      <a
        className={!company.twitter ? 'opacity-50 cursor-not-allowed' : ''}
        disabled={!company.twitter}
        target="_blank"
        rel="noopener noreferrer"
        href={
          company.twitter ? `https://www.twitter.com/${company.twitter}` : null
        }
      >
        <span className="sr-only">{`${company.name} twitter`}</span>
        <svg
          className="w-4 mr-2"
          viewBox="0 0 24 24"
          fill="#1DA1F2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.954 4.569a10 10 0 0 1-2.825.775 4.958 4.958 0 0 0 2.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 0 0-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 0 1-2.228-.616v.061a4.923 4.923 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.212.085 4.937 4.937 0 0 0 4.604 3.417 9.868 9.868 0 0 1-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0 0 7.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 0 0 2.46-2.548l-.047-.02z" />
        </svg>
      </a>
      <a
        className={!company.facebook ? 'opacity-50 cursor-not-allowed' : ''}
        disabled={!company.facebook}
        target="_blank"
        rel="noopener noreferrer"
        href={
          company.facebook
            ? `https://www.facebook.com/${company.facebook}`
            : null
        }
      >
        <span className="sr-only">{`${company.name} facebook`}</span>
        <svg
          className="w-4 mr-2"
          viewBox="0 0 24 24"
          fill="#3B5998"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.408.593 24 1.324 24h11.494v-9.294H9.689v-3.621h3.129V8.41c0-3.099 1.894-4.785 4.659-4.785 1.325 0 2.464.097 2.796.141v3.24h-1.921c-1.5 0-1.792.721-1.792 1.771v2.311h3.584l-.465 3.63H16.56V24h6.115c.733 0 1.325-.592 1.325-1.324V1.324C24 .593 23.408 0 22.676 0" />
        </svg>
      </a>
      <a
        className={!company.linkedin ? 'opacity-50 cursor-not-allowed' : ''}
        disabled={!company.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        href={
          company.linkedin
            ? `https://www.linkedin.com/company/${company.linkedin}`
            : null
        }
      >
        <span className="sr-only">{`${company.name} linkedin`}</span>
        <svg
          className="w-4 mr-2"
          viewBox="0 0 24 24"
          fill="#0077B5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
    </div>
  );
};

const TableRow = (company) => {
  let categoryClassName = 'bg-green-100 text-green-800';

  if (company.category === 'Public') {
    categoryClassName = 'bg-blue-100 text-blue-800';
  } else if (company.category === 'Private') {
    categoryClassName = 'bg-orange-100 text-orange-800';
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              loading="lazy"
              className="h-10 w-10 rounded-full"
              src={`/logos/${formatFilePath(company.name)}.jpg`}
              alt={company.name}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {company.name}
            </div>
            <div className="text-sm leading-5 text-gray-500">
              {company.city}, IA
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm leading-5 text-gray-900 min-w-md">
          {company.description}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <span
          className={`${categoryClassName} px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
        >
          {company.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap">
        <SocialMedia {...company} />
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
        <a href={company.careers} className="text-blue-600 hover:text-blue-900">
          View Jobs
        </a>
      </td>
    </tr>
  );
};

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col px-8 mb-8">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider">
                      Social
                    </th>
                    <th className="px-6 py-3 bg-gray-100"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {COMPANIES.map((company) => (
                    <TableRow key={company.name} {...company} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
