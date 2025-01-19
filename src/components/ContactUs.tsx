import axios from "axios";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface lRequestProps {
  fullName: string;
  email: string;
  message: string;
}
const ContactUs = () => {
  const [requests, setRequests] = useState<lRequestProps[]>();
  const fetchContactQueries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/contact-us-requests"
      );
      setRequests(response.data.list);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchContactQueries();
  }, []);
  return (
    <div className="pt-12">
      <Table className="border w-full">
        <TableCaption>A list of contact queries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S. No.</TableHead>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[350px]">Email</TableHead>
            <TableHead className="text-right w-[450px]">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests?.map((item: lRequestProps, index: number) => {
            return (
              <TableRow className="cursor-pointer">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{item.fullName}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell className="text-right">{item.message}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ContactUs;
