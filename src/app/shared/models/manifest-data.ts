export interface MappedPassenger {
    suite_no: number;
    last_name: string;
    first_name: string;
    nationality: string;
    gender: string;
    birth_date: string;
    pob: string;
    document_type: any;
    document_no: any;
    document_issue_date: string;
    document_expiry_date: string;
    visa_no: string;
    type: string;
    issue_date: string;
    expiry_date: string;
    place_of_boarding: string;
}

export interface MappedCrew {
  crew_code: number;
  last_name: string;
  first_name: string;
  nationality: string;
  gender: string;
  dob: string;
  position: string;
  document_type: any;
  document_no: any;
  // document_issue_date: string;
  // document_expiry_date: string;
  passport_no: string;
  date_of_issue: string;
  date_of_expiry: string;
  // visa_no: string;
  // type: string;
  // issue_date: string;
  // expiry_date: string;
  // place_of_boarding: string;
  seamans_book_no: string,
  seamans_book_country: string,
  seamans_book_issue_date: string,
  seamans_book_place_of_issue: string,
  seamans_book_expiration_date: string
}