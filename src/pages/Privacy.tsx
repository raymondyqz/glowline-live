import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-purple-800 mb-8">Glowline Privacy Policy</h1>
              
              {/* Introduction */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Introduction</h2>
                <p className="text-gray-600 mb-6">
                  At Glowline, we prioritise your privacy and are committed to protecting your personal data.
                  This privacy policy is intended to help you understand how we collect, use, and protect your
                  personal data when you visit our website www.glowline.io ("Our Site"), or interact with our
                  agents.
                </p>
                <p className="text-gray-600 mb-6">
                  In this policy:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-600">
                  <li>"we", "us" and "our" refer to Glowline Group Ltd</li>
                  <li>"GDPR"</li>
                  <li>"you" and "your" refers to individuals that visit our website or communicate with our agents</li>
                  <li>"personal data" is any information that can be used to identify a person, either directly or indirectly (aligned with UK General Data Protection Regulation - "GDPR"). This does not include anonymised data.</li>
                </ul>

                {/* About Us */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">About Us</h2>
                <p className="text-gray-600 mb-6">
                  Glowline Group Ltd, trading as Glowline, is a limited company registered in England under
                  company number XXXXXXX, whose registered address is 21 Church End, Towcester,
                  Northamptonshire, NN12 7PX.
                </p>
                <p className="text-gray-600 mb-6">
                  Glowline provides a software-as-a-service (SaaS) application that allows other businesses to
                  streamline communications with their customers and service users through AI agents,
                  deployed via audio or text formats.
                </p>

                {/* What Data We Collect */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">What Data Do We Collect About You?</h2>
                <p className="text-gray-600 mb-4">We may collect and process the following types of personal data:</p>
                <div className="bg-purple-50 rounded-lg p-6 mb-6">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-purple-800 font-semibold pb-3">Data Type</th>
                        <th className="text-left text-purple-800 font-semibold pb-3">Examples</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="py-2 pr-4 font-medium">Identity Data</td>
                        <td>First name, maiden name, last name, username, marital status, title, date of birth, gender, voice</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Contact Data</td>
                        <td>Billing address, delivery address, email address, telephone numbers</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Transaction Data</td>
                        <td>Payments between us and other details of purchases made by you</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Profile Data</td>
                        <td>Username and password, purchases or orders, your interests, preferences, feedback and survey responses</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Usage Data</td>
                        <td>Information about how you use Our Site, products and services</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 font-medium">Marketing and Communications Data</td>
                        <td>Your preferences in receiving marketing communications from us, any third parties and your communication preferences</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* How We Collect Data */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">How Do We Collect This Data About You?</h2>
                <ol className="list-decimal pl-6 mb-6 text-gray-600">
                  <li className="mb-2">Automatically, when you visit Our Site (mainly relevant to Usage data).</li>
                  <li className="mb-2">Direct interaction with us via filling in forms on Our Site, engaging at events or by contacting us through email or phone.</li>
                  <li className="mb-2">Direct interaction with our AI agents, either online or by phone, when they act on behalf of a customer (another business organisation). For example, when booking an appointment or inquiring about service options.</li>
                  <li className="mb-2">Third parties, often customers (business organisations), may give us access to personal information such as account information.</li>
                </ol>

                {/* Purpose of Processing */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">For What Purpose Do We Process Your Information?</h2>
                <p className="text-gray-600 mb-4">
                  We will only use personal data for the purpose it was collected and will seek your consent if
                  we need to use it for another purpose. All personal data is processed and stored securely, for
                  no longer than is necessary for the purpose(s) for which it was first collected.
                </p>

                <div className="bg-purple-50 rounded-lg p-6 mb-6">
                  <table className="min-w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-purple-800 font-semibold pb-3">Purpose</th>
                        <th className="text-left text-purple-800 font-semibold pb-3">Data Type</th>
                        <th className="text-left text-purple-800 font-semibold pb-3">Lawful Basis for Processing</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="py-2 pr-4">To manage our business relationships with customers</td>
                        <td className="py-2 pr-4">Identity Data, Contact Data, Marketing and Communications Data</td>
                        <td>Necessary for our legitimate interests in running our business and keeping our records updated</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">To register you as a new customer</td>
                        <td className="py-2 pr-4">Identity Data, Contact Data</td>
                        <td>Necessary for our legitimate interests in running and growing our business</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">To communicate and support individuals on behalf of our customers</td>
                        <td className="py-2 pr-4">Identity Data, Contract Data, Transaction Data, Profile Data, Usage Data</td>
                        <td>Necessary for our legitimate interests in conducting our business services</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4">To anonymise personal data for AI training</td>
                        <td className="py-2 pr-4">Identity Data, Contract Data, Transaction Data, Profile Data, Usage Data</td>
                        <td>Necessary for our legitimate interests in growing our collection of proprietary training data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Data Retention */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">How Long Do We Retain Your Personal Data?</h2>
                <p className="text-gray-600 mb-6">
                  We will only retain your personal data for as long as necessary to fulfil the purposes we
                  collected it for, including for the purposes of satisfying any legal, accounting, or reporting
                  requirements. When we no longer need information, we will always dispose of it securely,
                  using specialist companies if necessary to do this work for us.
                </p>

                {/* Data Sharing */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Who Do We Share Your Personal Data With?</h2>
                <p className="text-gray-600 mb-6">
                  We only share your data for the purposes set out above, unless legally obliged to do so, where
                  we are complying with legal obligations, involved in legal proceedings, a court order or a
                  governmental authority.
                </p>
                <p className="text-gray-600 mb-6">
                  Parties we share your data with include service providers, regulators and third parties to
                  whom we may sell, transfer, or merge parts of our business or our assets. We have contracts
                  in place with our third parties, which are designed to help safeguard your personal
                  information.
                </p>

                {/* International Transfers */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">International Data Transfers</h2>
                <p className="text-gray-600 mb-6">
                  We collect information globally and may transfer, process and store your information outside
                  of your country of residence, to wherever we or our third-party service providers operate for
                  the purpose of providing you the Services unless expressly agreed otherwise between us and
                  a customer with data sovereignty requirements. Whenever we transfer your information, we
                  take measures to protect it.
                </p>

                {/* Your Rights */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">Under the legitimate interest lawful basis, individuals will have the following rights under GDPR:</p>
                <ol className="list-decimal pl-6 mb-6 text-gray-600">
                  <li className="mb-2">Right to be informed - Individuals have the right to be informed about the collection and use of their personal data.</li>
                  <li className="mb-2">Right of access - Individuals have the right to access and receive a copy of their personal data, and other supplementary information.</li>
                  <li className="mb-2">Right to rectification - The UK GDPR includes a right for individuals to have inaccurate personal data rectified, or completed if it is incomplete.</li>
                  <li className="mb-2">Right to erasure - The UK GDPR introduces a right for individuals to have personal data erased.</li>
                  <li className="mb-2">Right to restrict processing - Individuals have the right to request the restriction or suppression of their personal data.</li>
                  <li className="mb-2">Right to data portability - The right to data portability allows individuals to obtain and reuse their personal data for their own purposes across different services.</li>
                  <li className="mb-2">Right to object - The UK GDPR gives individuals the right to object to the processing of their personal data in certain circumstances.</li>
                </ol>

                {/* Contact Information */}
                <h2 className="text-2xl font-semibold text-purple-700 mt-8 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  If you have any further questions, please email us at{" "}
                  <a href="mailto:info@glowline.io" className="text-purple-600 hover:text-purple-700">
                    info@glowline.io
                  </a>{" "}
                  for more information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;