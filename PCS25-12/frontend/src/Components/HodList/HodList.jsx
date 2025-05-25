import React from 'react';

const HodList = ({ data }) => {
  return (
    <div>
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <h1 className="font-bold text-gray-900 text-base">HOD's List</h1>
        <div className="mt-4">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto">
              <div className="py-2 align-middle inline-block min-w-full">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Gender
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Phone
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data && data.length > 0 ? (
                        data.map((hod, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              {hod.name}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              {hod.gender}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              {hod.department}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              {hod.phone}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm text-gray-800 leading-5">
                              {hod.email}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-center">
                            No data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HodList;
