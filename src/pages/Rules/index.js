import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

function Rules(props) {
  const [scroll, setScroll] = useState("paper");

  const handleClose = () => {
    props.onClose();
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (props.open && descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        The prohibited documents for publication on DocShare website.
      </DialogTitle>
      <DialogContent dividers={scroll === "paper"}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <h2>1. Documents not allowed on DocShare</h2>
          <p>
            <strong>a. Top Secret Documents</strong>
            <ul>
              <li>
                National security strategy documents; national defense plans;
                mobilization plans for coping with war; crucial weapons and
                equipment for national defense;
              </li>
              <li>
                Party and state policies on domestic and foreign affairs of the
                Communist Party of Vietnam and the Socialist Republic of Vietnam
                that have not been disclosed or not yet disclosed.
              </li>
              <li>
                Information from foreign countries or international
                organizations transferred to Vietnam that the Government
                determines to be Top Secret.
              </li>
              <li>
                Intelligence and counter-espionage organization and activities
                as regulated by the Government.
              </li>
              <li>State secrets and codes;</li>
              <li>
                National strategic reserves; budget estimates and settlements in
                undisclosed areas; plans for issuing money, security features of
                each denomination of currency, and undisclosed money exchange
                plans;
              </li>
              <li>
                Prohibited areas and locations; other information and documents
                that the Government determines to be Top Secret.
              </li>
            </ul>
          </p>
          <p>
            <strong>b. Confidential Documents</strong>
            <ul>
              <li>
                High-level negotiations and contacts between Vietnam and foreign
                countries or international organizations on politics, national
                defense, security, foreign affairs, economics, science,
                technology, and other undisclosed areas.
              </li>
              <li>
                Information from foreign countries or international
                organizations transferred to Vietnam that the Government
                determines to be Confidential.
              </li>
              <li>
                Organization, equipment, and combat plans of the People's Armed
                Forces units, except for organizations and activities regulated
                in Clause 3, Article 5 of the Law; plans for manufacturing,
                transporting, and storing weapons; important border defense,
                airspace defense, maritime defense, and island defense projects;
              </li>
              <li>
                Military maps; coordinates of the state-level I and II network
                landmarks along with accompanying notes.
              </li>
              <li>
                Locations and elevations of major meteorological, hydrological,
                and marine stations; absolute height and number data of marine
                landmarks;
              </li>
              <li>
                Amounts of money printed and issued; reserves of Vietnamese and
                foreign currency; undisclosed cash overspending and inflation
                figures of money; undisclosed prices of strategic goods managed
                by the State;
              </li>
              <li>
                Locations and amounts of precious metals, gemstones, foreign
                currency, and other valuable assets of the State;
              </li>
              <li>
                Scientific works, inventions, patents, solutions, and special
                occupational secrets of great importance to national defense,
                security, economics, science, and technology that have not been
                disclosed by the State;
              </li>
              <li>
                Plans for exporting and importing special goods of vital
                importance to national development and defense that have not
                been disclosed or not yet disclosed.
              </li>
            </ul>
          </p>
          <h2>2. Prohibited advertisements for goods and services</h2>
          <p>
            <strong>
              a. DocShare prohibits members from posting documents related to
              the following goods and services:
            </strong>
            <ul>
              <li>Goods and services that are prohibited from trading</li>
              <li>Cigarettes</li>
              <li>Alcohol with an alcohol content of 15 degrees or higher</li>
              <li>
                Milk products that replace breast milk for children under 24
                months of age, nutritional supplements for children under 6
                months of age, and artificial nipples and pacifiers
              </li>
              <li>
                Prescription drugs; non-prescription drugs that are restricted
                or require supervision by a doctor as recommended by the
                competent state agency
              </li>
              <li>Products with aphrodisiac properties</li>
              <li>
                Hunting guns and hunting bullets, sports weapons, and products
                and goods with violent tendencies
              </li>
              <li>
                Other prohibited products, goods, and advertising services as
                regulated by the Government when they arise in practice
              </li>
            </ul>
          </p>
          <p>
            <strong>
              b. Prohibited actions by members after posting documents
            </strong>
            <ul>
              <li>
                Posting documents related to the above-mentioned prohibited
                goods and services
              </li>
              <li>
                Advertising that reveals state secrets, harms independence,
                national sovereignty, security, and national defense
              </li>
              <li>
                Advertising that lacks aesthetics, contravenes the country's
                historical, cultural, ethical, and traditional values
              </li>
              <li>
                Advertising that affects urban aesthetics, traffic safety,
                social safety
              </li>
              <li>
                Advertising that harms the dignity of the National Flag,
                National Anthem, National Emblem, Party Flag, national heroes,
                cultural celebrities, leaders of the Party and the State
              </li>
              <li>
                Advertising with discriminatory content, which discriminates
                against ethnicity, infringes on freedom of belief, religion, and
                prejudices about gender and disabilities
              </li>
              <li>
                Advertising that offends the reputation, honor, and dignity of
                organizations and individuals
              </li>
              <li>
                Advertising that uses the image, voice, and written words of
                individuals without their permission, except when permitted by
                law
              </li>
              <li>
                Advertising that is incorrect or misleading about the ability to
                do business, the ability to supply products, goods, and services
                of organizations and individuals doing business with products,
                goods, and services; about quantity, quality, price, efficacy,
                design, packaging, brand, origin, type, method of service,
                warranty period of products, goods, and services that have been
                registered or announced
              </li>
              <li>
                Advertising by comparing directly with other organizations or
                individuals about the price, quality, and efficiency of using
                their products, goods, and services to the same type of
                products, goods, and services of other organizations or
                individuals
              </li>
              <li>
                Advertising that uses words such as "best," "unique," "top," or
                words with similar meanings without legal documents proving as
                regulated by the Ministry of Culture, Sports, and Tourism
              </li>
              <li>Advertising that violates intellectual property laws</li>
              <li>
                Advertising that creates thoughts, words, and actions against
                ethics and traditionalvalues
              </li>
            </ul>
          </p>
          <h2>3. Guidelines for Uploading Documents</h2>
          <strong>a. Title:</strong>
          <ul>
            <li>
              The title of the document should not be the same as the title
              within the content of the document (if any). For example, for a
              thesis, the title of the document should be the title of the
              thesis.
            </li>
            <li>
              The title should be appropriate for the content of the document,
              not too general, and should provide an overview of the content of
              the document, such as an introduction, cover page, etc.
            </li>
            <li>
              The title should be in standard Vietnamese with proper accents
              (for Vietnamese documents), at least 20 characters long, and
              should not contain any special characters such as ", / , [, ] , -,
              _, $, #, &, *, @, !.
            </li>
            <li>
              The words in the title should be separated by spaces, without any
              words being concatenated.
            </li>
          </ul>
          <strong>b. Category:</strong>
          <ul>
            <li>
              The category selected must be appropriate for the content of the
              document.
            </li>
            <li>
              At least a level 2 category must be chosen. DocShare encourages
              the selection of deeper categories.
            </li>
          </ul>
          <strong>c. Description (optional):</strong>
          <ul>
            <li>The description should not be the same as the title.</li>
            <li>
              The description should be appropriate for the content of the
              document and provide additional information about it.
            </li>
            <li>
              The description should be in standard Vietnamese with proper
              accents (for Vietnamese documents), at least 200 characters long,
              and should not contain any special characters such as / , [, ] ,
              _, $, #, &, *, @, !.
            </li>
          </ul>
          <strong>d. Keywords:</strong>
          <ul>
            <li>
              Keywords should be appropriate for the content of the document and
              help users find it through search engines.
            </li>
            <li>
              Keywords should be in standard Vietnamese with proper accents (for
              Vietnamese documents), at least 3 words long, and should not
              contain any special characters such as ', ", / , [, ] , -, _, $,
              #, &, *, (, ), @, !.
            </li>
          </ul>
          <h2>
            4. Measures to Manage Copyright Infringing Information/Documents
          </h2>
          <p>
            DocShare implements necessary management measures to protect
            copyrighted documents by providing specific regulations as follows:
          </p>
          <ul>
            <li>
              If the DocShare management board, through technical and
              professional review, discovers that the information/documents
              uploaded by a member violate copyright laws and are not authorized
              by the author/rights holder, the DocShare management board will
              delete such information/documents immediately upon discovering the
              violation.
            </li>
            <li>
              If a member/user reports or complains about copyrighted documents
              uploaded on DocShare, and if the report or complaint is
              accompanied by evidence proving its accuracy and legitimacy, the
              DocShare management board will review and verify the related
              information and process it as follows:
              <ul>
                <li>
                  If the documents violate the regulations: the copyrighted
                  documents will be deleted, and a warning message will be sent
                  to the member who uploaded the documents within 8 hours from
                  the time the report/complaint is received.
                </li>
              </ul>
            </li>
          </ul>
          <h2>5. Penalty Regulations</h2>
          <p>
            The penalty regulations of the DocShare website state that if a
            member violates the regulations, their account will be suspended
            indefinitely. This means that the member will not be able to access
            the website or use its services in the future.
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}

export default Rules;
