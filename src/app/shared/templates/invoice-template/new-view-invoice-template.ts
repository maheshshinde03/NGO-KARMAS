import * as _ from "lodash";
// import * as moment from "moment";
import moment from 'moment';
// import * as pdf from "pdfmake/build/pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Dummy_Stamp } from "./dummy-stamp";
import { Dummy_Logo } from "./dummy-logo";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface bindingDataModel {
  invoiceData: any;
}

export class InvoicePDF {
  private dummyLogo = Dummy_Logo;
  // Stamp Image
  private stampBase64 = Dummy_Stamp;
  private bindingData: bindingDataModel;
  private documentDefinition: any;
  gstTotalAmt: any;
  totalItemValue: number;
  // stampBase64
  constructor(bindingData: bindingDataModel) {
    this.bindingData = bindingData;
    this.documentDefinition = this.getDocumentDefinition();
  }

  downloadPdf(fileName: string) {
    pdfMake.createPdf(this.documentDefinition).download(`PDF_` + fileName);
  }

  openPdf() {
    const newWin = window.open("", "_blank");
    pdfMake.createPdf(this.documentDefinition).open({}, newWin);
  }

  getBase64() {
    return new Promise<string>((resolve) => {
      pdfMake.createPdf(this.documentDefinition).getBase64((data) => {
        const base64 = data;
        if (base64) {
          resolve(base64);
        }
      });
    });
  }

  getArrayBuffer() {
    return new Promise<string>((resolve) => {
      pdfMake.createPdf(this.documentDefinition).getBuffer((data) => {
        const arrayBuffer = data;
        if (arrayBuffer) {
          // resolve(arrayBuffer);
          resolve(arrayBuffer.toString('base64'));
        }
      });
    });
  }

  // Template Start

  private getDocumentDefinition() {
    return {
      content: [
        this.createOrgStrip(this.bindingData.invoiceData),
        this.taxInvoiceDetails(this.bindingData.invoiceData),
        this.createInvoiceTable(this.bindingData.invoiceData),
        this.createFooter(this.bindingData.invoiceData),
        // this.createHSNTable(this.bindingData.invoiceData),
        // this.createRemark(this.bindingData.invoiceData),
        // this.createDeclaration(this.bindingData.invoiceData),
      ],
      styles: [],
      pageMargins: [0, 0, 0, 0],
    };
  }

  private createFooter(invoiceData: any) {
    const template = {
      text: `REGISTERED ADDRESS:- ${invoiceData?.companyDetails?.organization?.address}`,
      bold: false,
      fontSize: 10,
      alignment: "center",
      margin: [0, 5, 0, 5],
    };
    return template;
  }

  private createOrgStrip(invoiceData: any) {
    const template = {
      columns: [
        {
          stack: [
            {
              image: this.dummyLogo,
              width: 90,
              height: 50,
              margin: [15, 0, 0, 0],
            },
          ],
          width: 100,
        },
        {
          stack: [
            // {
            //   text: `${invoiceData?.invoiceTypeName}`,
            //   bold: true,
            //   fontSize: 14,
            //   margin: [0, 16, 0, 16],
            // },
            {
              text: `${invoiceData?.companyDetails?.organization?.name}`,
              fontSize: 20,
              color: `#25688e`,
              bold: true,
              alignment: `center`,
              margin: [0, 16, 0, 16],
            },
            {
              text: `${invoiceData?.companyDetails?.organization?.address}`,
              fontSize: 10,
              color: `#191919`,
              alignment: `center`,
              margin: [0, 0, 0, 16],
            },
            {
              columns: [
                {
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            {
                              text: `STATE:`,
                              fontSize: 10,
                              alignment: `left`,
                              bold: true,
                            },
                          ],
                          width: "25%",
                        },
                        {
                          stack: [
                            {
                              text: `[${invoiceData?.companyDetails?.organization?.stateTinCode}] ${invoiceData?.companyDetails?.organization?.stateName}`,
                              fontSize: 10,
                              alignment: `left`,
                            },
                          ],
                          width: "75%",
                        },
                      ],
                      columnGap: 2,
                    },
                  ],
                  width: "53%",
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            {
                              text: `GSTIN/UIN:`,
                              fontSize: 10,
                              alignment: `left`,
                              bold: true,
                            },
                          ],
                          width: "25%",
                        },
                        {
                          stack: [
                            {
                              text: `${invoiceData?.companyDetails?.organization?.gstin}`,
                              fontSize: 10,
                              alignment: `left`,
                            },
                          ],
                          width: "75%",
                        },
                      ],
                      columnGap: 2,
                    },
                  ],
                  width: "70%",
                },
              ],
            },
            {
              columns: [
                {
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            {
                              text: `CIN NO:`,
                              fontSize: 10,
                              alignment: `left`,
                              bold: true,
                            },
                          ],
                          width: "25%",
                        },
                        {
                          stack: [
                            {
                              text: `${invoiceData?.companyDetails?.organization?.cinNo
                                ? invoiceData?.companyDetails?.organization
                                  ?.cinNo
                                : "U63090MH2020PTC338237"
                                }`,
                              fontSize: 10,
                              alignment: `left`,
                            },
                          ],
                          width: "75%",
                        },
                      ],
                      columnGap: 2,
                    },
                  ],
                  width: "53%",
                },
                {
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            {
                              text: `PAN NO:`,
                              fontSize: 10,
                              alignment: `left`,
                              bold: true,
                            },
                          ],
                          width: "25%",
                        },
                        {
                          stack: [
                            {
                              text: `${invoiceData?.companyDetails?.organization
                                ?.pancardNo
                                ? invoiceData?.companyDetails?.organization
                                  ?.pancardNo
                                : "AACCU5773F"
                                }`,
                              fontSize: 10,
                              alignment: `left`,
                            },
                          ],
                          width: "75%",
                        },
                      ],
                      columnGap: 2,
                    },
                  ],
                  width: "70%",
                },
              ],
            },
          ],
          alignment: `center`,
          width: `*`,
        },
        {
          stack: [
            invoiceData?.qrCode
              ? {
                image: invoiceData?.qrCode ? invoiceData?.qrCode : "",
                width: 150,
                height: 150,
              }
              : {},
          ],
          alignment: `center`,
          width: 150,
        },
      ],
      columnGap: 5,
      margin: [10, 10, 0, 6],
    };
    return template;
  }

  private taxInvoiceDetails(invoiceData: any) {
    const template = {
      stack: [
        {
          columns: [
            {
              stack: [
                { text: `IRN CODE`, fontSize: 10 },
                // { text: `Ack No.`, fontSize: 10 },
                // { text: `Ack Date`, fontSize: 10 },
              ],
              width: 60,
            },
            {
              stack: [
                { text: ``, fontSize: 10 },
                // { text: ``, fontSize: 10 },
                // { text: ``, fontSize: 10 },
              ],
              width: 12,
            },
            {
              stack: [
                {
                  text: `${invoiceData?.irn ? invoiceData?.irn : "-"}`,
                  bold: true,
                  fontSize: 10,
                },
                // {
                //   text: `${invoiceData?.ackNo ? invoiceData?.ackNo : "-"}`,
                //   bold: true,
                //   fontSize: 10,
                // },
                // {
                //   text: `${invoiceData?.ackDate ? invoiceData?.ackDate : "-"}`,
                //   bold: true,
                //   fontSize: 10,
                // },
                // { text: `${invoiceData?.ackDate ? moment(invoiceData?.ackDate).format('DD-MMM-YYYY') : '-'}`, bold: true, fontSize: 10 },
              ],
              width: `*`,
              alignment: `left`,
            },
          ],
          columnGap: 10,
          margin: [10, 10, 10, 10],
        }
      ],
      width: `75%`,
    };
    return template;
  }

  private createInvoiceTable(invoiceData: any) {
    const table = {
      table: {
        widths: [15, 60, 27, 20, 40, 25, 40, 30, 50, 22, 22, 21, "*", 40],
        body: [
          [
            {
              colSpan: 14,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `${invoiceData?.invoiceTypeName}`,
                          // bold: true,
                          fontSize: 16,
                          alignment: `center`,
                        },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              colSpan: 8,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: " ",
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "100%",
                    }
                  ],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `TO`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "20%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.companyDetails?.customer?.name ||
                            invoiceData?.companyDetails?.customer?.customerName
                            }`,
                          fontSize: 10,
                        },
                      ],
                      width: "80%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `ADDRESS`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "20%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.companyDetails?.customer?.address}`,
                          fontSize: 10,
                        },
                      ],
                      width: "80%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `PAN NO`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "20%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.companyDetails?.customer?.panNo}`,
                          fontSize: 10,
                        },
                      ],
                      width: "80%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `GSTIN`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "20%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.companyDetails?.customer?.gstin}`,
                          fontSize: 10,
                        },
                      ],
                      width: "80%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `STATE`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "20%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}[${invoiceData?.companyDetails?.customer?.stateTinCode}] ${invoiceData?.companyDetails?.customer?.stateName}`,
                          fontSize: 10,
                        },
                      ],
                      width: "80%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
              ],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
              colSpan: 6,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: " ",
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "100%",
                    }
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `INVOICE NO`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.invoiceNo}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `INVOICE DATE`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.invoiceDate
                            ? moment(invoiceData?.invoiceDate).format('DD-MM-YYYY')
                            : ""
                            }`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `PLACE OF SUPPLY`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.companyDetails?.organization?.placeofsupply}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
              ],
            },
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              colSpan: 8,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: " ",
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "100%",
                    }
                  ],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `ARRIVAL DATE & TIME`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.shipmentDetails?.actual_arrival_date ? moment(invoiceData?.shipmentDetails?.actual_arrival_date).format('DD-MM-YYYY HH:mm:ss') : '-'} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `DEPARTURE DATE & TIME`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.shipmentDetails?.actual_departure_date ? moment(invoiceData?.shipmentDetails?.actual_departure_date).format('DD-MM-YYYY HH:mm:ss') : '-'} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `BERTH`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.shipmentDetails?.berth || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `SHIP`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.shipmentDetails?.shipname || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `JOB ID`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} ${invoiceData?.shipmentDetails?.jobid}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `VCN NO.`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.shipmentDetails?.vcn || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },


              ],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
              colSpan: 6,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: " ",
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "100%",
                    }
                  ],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `PORTCALL NO.`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.shipmentDetails?.port_call_no || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `EMBARKATION PAX`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.embarcationpax} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `DISEMBARKATION PAX`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.disembarcationpax} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `TRANSIT PAX`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `GRT`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.shipmentDetails?.grt || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `NRT`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space}${invoiceData?.shipmentDetails?.nrt || ''}`,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
                {
                  columns: [
                    {
                      stack: [
                        {
                          text: `PORT EX.RATE`,
                          bold: true,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                    {
                      stack: [
                        {
                          text: `${invoiceData?.space} `,
                          fontSize: 10,
                        },
                      ],
                      width: "50%",
                    },
                  ],
                  margin: [0, 0, 0, 3],
                },
              ],
            },
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              colSpan: 2,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "SR NO", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
            {
              colSpan: 3,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "DESCRIPTION", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
            {},
            {
              colSpan: 2,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "SAC CODE", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
            {
              colSpan: 1,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "CURR", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {
              colSpan: 1,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "QUANTITY", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {
              colSpan: 3,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "RATE", alignment: 'center', fontSize: 10, bold: true },
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
            {},
            {
              colSpan: 2,
              stack: [
                {
                  columns: [
                    {
                      stack: [
                        { text: "AMOUNT", alignment: 'center', fontSize: 10, bold: true }
                      ],
                      width: "100%",
                    },
                  ],
                },
              ],
            },
            {},
          ]
        ]
          .concat(
            invoiceData?.rateDetails?.invoiceItems.map((item: any, index: any) => {
              return [
                {
                  colSpan: 2,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: `${index + 1}`, alignment: 'center', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {},
                {
                  colSpan: 3,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: item?.service_sub_type, alignment: 'center', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {},
                {},
                {
                  colSpan: 2,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: item?.sac_code || "", alignment: 'center', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {},
                {
                  colSpan: 1,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: "INR", alignment: 'center', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {
                  colSpan: 1,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: `${Number(item?.quantity)}`, alignment: 'center', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {
                  colSpan: 3,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: `${this.numberFormat(item?.rate)}`, alignment: 'right', fontSize: 10, bold: false },
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {},
                {},
                {
                  colSpan: 2,
                  stack: [
                    {
                      columns: [
                        {
                          stack: [
                            { text: this.numberFormat(item?.total_amount), alignment: 'right', fontSize: 10, bold: false }
                          ],
                          width: "100%",
                        },
                      ],
                    },
                  ],
                },
                {},
              ]
            }) as any
          )
          .concat([
            [
              {
                colSpan: 8,
                stack: [
                  {
                    columns: [
                    ],
                  },
                ],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {
                colSpan: 6,
                stack: [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `TOTAL AMOUNT`,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(invoiceData.rateDetails.amount),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `CGST @ 9% `,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            // text: this.numberFormat(
                            //   this.calculateGSTAmount(
                            //     invoiceData?.rateDetails?.invoiceItems,
                            //     invoiceData
                            //   )
                            // ),
                            text: this.numberFormat(
                              invoiceData.rateDetails.cgstRate
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `SGST @ 9% `,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(
                              invoiceData.rateDetails.sgstRate
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `IGST @ 18% `,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(
                              invoiceData.rateDetails.igstRate
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `TOTAL TAX AMOUNT `,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(
                              invoiceData.rateDetails.taxableAmount
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `ROUND-OFF`,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(
                              invoiceData.rateDetails.RoundOffAmount
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                  {
                    columns: [
                      {
                        stack: [
                          {
                            text: `TOTAL INVOICE AMOUNT `,
                            fontSize: 10,
                            alignment: `left`,
                            bold: true,
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `INR`,
                            fontSize: 10,
                            alignment: `center`,
                            bold: true,
                          },
                        ],
                        width: "10%",
                      },
                      {
                        stack: [
                          {
                            text: this.numberFormat(
                              invoiceData.rateDetails.totalAmount
                            ),
                            fontSize: 10,
                            alignment: `right`,
                          },
                        ],
                        width: "30%",
                      },
                    ],
                  },
                ],
              },
              {},
              {},
              {},
              {},
              {},
            ],
          ] as any)
          .concat([
            [
              {
                colSpan: 14,
                stack: [
                  {
                    text: [
                      { text: `AMOUNT IN WORD : `, bold: true },
                      `${invoiceData?.rateDetails?.amountInWords} RUPEES ONLY.`,
                    ],
                    fontSize: 10,
                    alignment: `left`,
                    margin: [0, 3, 0, 3]
                  },
                ],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ] as any)
          .concat([
            [
              {
                colSpan: 14,
                stack: [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            columns: [
                              {
                                stack: [
                                  {
                                    text: `PAYMENT DETAILS : `,
                                    fontSize: 10,
                                    alignment: `left`,
                                    bold: true,
                                    margin: [0, 3, 0, 4]
                                  },
                                  {
                                    text: `BANK NAME    : ${invoiceData?.space}${invoiceData?.bankDetails?.name}`,
                                    fontSize: 10,
                                    alignment: `left`,
                                    margin: [0, 0, 0, 3]
                                  },
                                  // {
                                  //   text: `BRANCH NAME : ${invoiceData?.bankDetails?.branchName}`,
                                  //   fontSize: 10,
                                  //   alignment: `left`,
                                  //   margin: [0, 0, 0, 3]
                                  // },
                                  {
                                    text: `A/C NO             : ${invoiceData?.space}${invoiceData?.bankDetails?.accountNumber}`,
                                    fontSize: 10,
                                    alignment: `left`,
                                    margin: [0, 0, 0, 3]
                                  },
                                  {
                                    text: `IFSC                  : ${invoiceData?.space}${invoiceData?.bankDetails?.ifscCode}`,
                                    fontSize: 10,
                                    alignment: `left`,
                                    margin: [0, 0, 0, 3]
                                  },
                                  {
                                    text: `SWIFT CODE   : ${invoiceData?.space}${invoiceData?.bankDetails?.swiftCode}`,
                                    fontSize: 10,
                                    alignment: `left`,
                                    margin: [0, 0, 0, 3]
                                  },
                                  {
                                    text: ``,
                                    fontSize: 10,
                                    alignment: `left`,
                                    margin: [0, 0, 0, 3]
                                  },
                                ],
                                width: "100%",
                              },
                              {
                                stack: [
                                  {
                                    text: ``,
                                    fontSize: 10,
                                    alignment: `left`,
                                  },
                                ],
                                width: "0%",
                              },
                            ],
                          },
                        ],
                        width: "60%",
                      },
                      {
                        stack: [
                          {
                            text: `FOR ${invoiceData?.companyDetails?.organization?.name}`,
                            fontSize: 10,
                            alignment: `right`,
                            bold: true,
                          },
                          {
                            image: this.stampBase64,
                            width: 100,
                            height: 100,
                            alignment: `right`,
                            // margin: [0, 5, 0, 0],
                          },
                          {
                            text: `AUTHORISED SIGNATORY`,
                            fontSize: 10,
                            alignment: `right`,
                            bold: true,
                            // margin: [0, 5, 0, 0],
                          },
                        ],
                        width: "40%",
                      },
                    ],
                  },
                ],
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ] as any),
        // Table Body Ends
      },
      fontSize: 10,

    };
    const stack = {
      stack: [table],
      margin: [10, 0, 10, 0],
    };
    return stack;
  }

  //   private createHSNTable(invoiceData: any) {
  //     const table = {
  //       table: {
  //         widths: ["*", 60, 40, 50, 70],
  //         body: [
  //           // Header
  //           [
  //             { text: `HSN/SAC`, alignment: `center`, rowSpan: 2 },
  //             { text: `Taxable Value`, alignment: `center`, rowSpan: 2 },
  //             { text: `Integrated Tax`, alignment: `center`, colSpan: 2 },
  //             {},
  //             { text: `Total Tax Amount`, alignment: `center`, rowSpan: 2 },
  //           ],
  //           [
  //             {},
  //             {},
  //             { text: `Rate`, alignment: `center` },
  //             { text: `Amount`, alignment: `center` },
  //             {},
  //           ],
  //         ]
  //           .concat(
  //             invoiceData?.hsnCodeItems?.map((row: any) => {
  //               return [
  //                 { text: row?.hsnCode },
  //                 {
  //                   text: this.numberFormat(Number(row?.amount)),
  //                   alignment: `right`,
  //                 },
  //                 {
  //                   text: `${invoiceData?.rateDetails?.igstRate}%`,
  //                   alignment: `right`,
  //                 },
  //                 {
  //                   text: this.numberFormat(Number(row?.taxableAmount)),
  //                   alignment: `right`,
  //                 },
  //                 {
  //                   text: this.numberFormat(Number(row?.taxableAmount)),
  //                   alignment: `right`,
  //                 },
  //               ];
  //             })
  //           )
  //           .concat([
  //             [
  //               { text: `Total`, bold: true, alignment: `right` },
  //               {
  //                 text: this.numberFormat(
  //                   Number(invoiceData?.hsnListTaxableTotalValue)
  //                 ),
  //                 bold: true,
  //                 alignment: `right`,
  //               },
  //               {},
  //               {
  //                 text: this.numberFormat(
  //                   Number(invoiceData?.hsnListTaxableTotalAmount)
  //                 ),
  //                 bold: true,
  //                 alignment: `right`,
  //               },
  //               {
  //                 text: this.numberFormat(
  //                   Number(invoiceData?.hsnListTaxableTotalAmount)
  //                 ),
  //                 bold: true,
  //                 alignment: `right`,
  //               },
  //             ],
  //           ] as any),
  //       },
  //       fontSize: 10,
  //     };
  //     const stack = {
  //       stack: [
  //         table,
  //         {
  //           columns: [
  //             { text: `Tax Amount (in Words) :`, fontSize: 10, width: `auto` },
  //             {
  //               text: `INR ${invoiceData?.hsnTotalValueInWords}`,
  //               fontSize: 12,
  //               bold: true,
  //               width: `*`,
  //               margin: [1, 0, 0, 0],
  //             },
  //           ],
  //           margin: [0, 5, 0, 0],
  //         },
  //       ],
  //       margin: [10, 5, 10, 5],
  //     };
  //     return stack;
  //   }

  //   private createRemark(invoiceData: any) {
  //     const template = {
  //       columns: [
  //         {
  //           width: `50%`,
  //           stack: [
  //             { text: `Remark: `, italics: true },
  //             { text: `Packages : ${invoiceData?.shipmentDetails?.packageQty}` },
  //           ],
  //         },
  //         {
  //           stack: [
  //             { text: `Company Bank Details: `, italics: true },
  //             {
  //               text: `A/c Holder's Name : ${invoiceData?.companyDetails?.organization?.name}`,
  //             },
  //             { text: `Bank Name : ${invoiceData?.bankDetails?.name}` },
  //             { text: `A/c No. : ${invoiceData?.bankDetails?.accountNumber}` },
  //             {
  //               text: `Branch & IFS Code : ${invoiceData?.bankDetails?.branchName} Branch & ${invoiceData?.bankDetails?.ifscCode}`,
  //             },
  //             {
  //               text: `for ${invoiceData?.companyDetails?.organization?.name}`,
  //               bold: true,
  //               alignment: `center`,
  //             },
  //           ],
  //           width: `50%`,
  //         },
  //       ],
  //       fontSize: 10,
  //       margin: [10, 0, 10, 0],
  //     };
  //     return template;
  //   }

  //   private createDeclaration(invoiceData: any) {
  //     const template = {
  //       stack: [
  //         {
  //           columns: [
  //             {
  //               stack: [
  //                 { text: `Declaration`, decoration: `underline` },
  //                 {
  //                   alignment: `justify`,
  //                   text: `We declare that this invoice shows the actual price described and that all particulars are true and correct
  //                                 DISCLAIMER: Dear Customer, We would request please check your GST No and address properly and in case of error please escalate to us for corrective action within 48 hours of the receipt of invoice, we shall not be responsbile for any error and no request for change will be entertained after 48hours of receipt of the invoice.`,
  //                 },
  //               ],
  //               width: `50%`,
  //             },
  //             {},
  //           ],
  //           fontSize: 8,
  //         },
  //         {
  //           text: `Authorised Signatory`,
  //           alignment: `right`,
  //           fontSize: 10,
  //         },
  //         {
  //           text: `This is a Computer Generated Invoice`,
  //           alignment: `center`,
  //           decoration: `underline`,
  //           fontSize: 10,
  //         },
  //       ],
  //       margin: [10, 20, 10, 0],
  //     };
  //     return template;
  //   }

  // Utils

  // private numberFormat(data: number) {
  //   if (data > 10)
  //     return Number(data)
  //       ?.toFixed(2)
  //       ?.toString()
  //       ?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, `,`);
  //   else
  //     return data?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, `,`);
  // }

  // private numberFormat(data: number): string {
  //   const numberString = data.toString();
  //   if (numberString.length <= 3)
  //     return numberString
  //   const lastThreeDigits = numberString.slice(-3);
  //   const otherDigits = numberString.slice(0, -3);
  //   const formattedOtherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  //   return formattedOtherDigits + ',' + lastThreeDigits;
  // }

  // private numberFormat(data: number): string {
  //   const numberString = data.toString();
  //   const [wholePart, decimalPart] = numberString.split('.');

  //   if (wholePart.length <= 3) {
  //     return decimalPart ? `${wholePart}.${decimalPart}` : wholePart;
  //   }

  //   const lastThreeDigits = wholePart.slice(-3);
  //   const otherDigits = wholePart.slice(0, -3);
  //   const formattedOtherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  //   const formattedNumber = formattedOtherDigits + ',' + lastThreeDigits;
  //   return decimalPart ? `${formattedNumber}.${decimalPart}` : formattedNumber;
  // }

  private numberFormat(data: number): string {
    const numberString = data.toString();
    const [wholePart, decimalPart] = numberString.split('.');

    if (wholePart.length <= 3) {
      return decimalPart ? `${wholePart}.${decimalPart}` : `${wholePart}.00`;
    }

    const lastThreeDigits = wholePart.slice(-3);
    const otherDigits = wholePart.slice(0, -3);
    const formattedOtherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

    const formattedNumber = formattedOtherDigits + ',' + lastThreeDigits;

    return decimalPart ? `${formattedNumber}.${decimalPart}` : `${formattedNumber}.00`;
  }



  calculateTaxableAmount(array: any) {
    const initialValue = 0;
    const sumWithInitial = array.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + Number(currentValue.quantity) * Number(currentValue.rate),
      initialValue
    );
    return sumWithInitial;
  }

  calculateGSTAmount(array: any, invoiceData?: any) {
    const organizationStateName =
      invoiceData?.companyDetails?.organization?.stateName;
    const customerStateName = invoiceData?.companyDetails?.customer?.stateName;
    const gstRate =
      organizationStateName == customerStateName
        ? Number(invoiceData?.rateDetails?.cgstRate) +
        Number(invoiceData?.rateDetails?.sgstRate)
        : Number(invoiceData?.rateDetails?.igstRate);
    const gstRateValue = gstRate / 100;
    console.log({
      invoiceData,
      organizationStateName,
      customerStateName,
      gstRateValue,
      gstRate,
    });
    const initialValue = 0;
    const sumWithInitial = array.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator +
        (Number(currentValue?.quantity) *
          Number(currentValue?.rate) *
          Number(gstRateValue) *
          100) /
        100,
      initialValue
    );
    this.gstTotalAmt = sumWithInitial;
    return (sumWithInitial).toFixed(2);
  }
}
