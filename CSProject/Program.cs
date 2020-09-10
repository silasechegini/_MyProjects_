using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSProject
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Staff> myStaff = new List<Staff>();
            FileReader fr = new FileReader();
            int month = 0, year = 0;

            while (year == 0)
            {
                Console.Write("\nPlease enter the year: ");

                try
                {
                    year = Convert.ToInt32(Console.ReadLine());
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message + " Please try again.");
                }
            }

            while (month == 0)
            {
                Console.Write("\nPlease enter the month: ");

                try
                {
                    month = Convert.ToInt32(Console.ReadLine());

                    if (month < 1 || month > 12)
                    {
                        Console.WriteLine("Month must be from 1 to 12. Please try again.");
                        month = 0;
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message + " Please try again.");
                }
            }

            myStaff = fr.readFile();

            for (int i = 0; i < myStaff.Count; i++)
            {
                try
                {
                    Console.Write("\nEnter hours worked for {0}: ", myStaff[i].nameOfStaff);
                    myStaff[i].hoursWorked = Convert.ToInt32(Console.ReadLine());
                    myStaff[i].calculatePay();
                    Console.WriteLine(myStaff[i].ToString());
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                    i--;
                }
            }

            PaySlip ps = new PaySlip(month, year);
            ps.generatePaySlip(myStaff);
            ps.generateSummary(myStaff);

            Console.Read();
        }
    }

    public class Staff
    {
        private float hourlyRate;
        private int hWorked;

        public float totalPay {
            protected set;
            get;
        }
        public float basicPay {
            private set;
            get;
        }
        public string nameOfStaff {
            private set;
            get;
        }

        public int hoursWorked
        {
            set {
                if (value > 0) {
                    hWorked = value;
                }
                else
                {
                    hWorked = 0;
                }
            }
            get { return hWorked; }
        }
        public virtual void calculatePay()
        {
            Console.WriteLine("calculating pay ...");
            basicPay = hWorked * hourlyRate;
            totalPay = basicPay;
        }

        public override string ToString()
        {
            return base.ToString();
        }
        public Staff(string name, float rate)
        {
            nameOfStaff = name;
            hourlyRate = rate;
        }
    }

    public class Manager : Staff
    {
        private const float managerHourlyRate = 50;

        public int Allowance
        {
            private set;
            get;
        }
        public override void calculatePay()
        {
            base.calculatePay();
            Allowance = 1000;
            if(hoursWorked >= 160)
            {
                totalPay = totalPay + Allowance;
            }
        }

        public override string ToString()
        {
            return "\n Staff Name: " + nameOfStaff +
                "\n Hours Worked: " + hoursWorked +
                "\n Allowance: " + Allowance +
                "\n Basic Pay: " + basicPay +
                "\n Total Pay: " + totalPay;
        }

        public Manager(string name) : base (name, managerHourlyRate)
        {

        }

    }

    public class Admin : Staff
    {
        private const float overtimeRate = 15.5F;
        private const float adminHourlyRate = 30;

        public float overtime
        {
            private set;
            get;
        }
        public override void calculatePay()
        {
            base.calculatePay();
            if (hoursWorked >= 160)
            {
                overtime = overtimeRate * (hoursWorked - 160);
                totalPay = totalPay + overtime;
            }
        }

        public override string ToString()
        {
            return "\n Staff Name: " + nameOfStaff +
                "\n Hours Worked: " + hoursWorked +
                "\n Overtime: " + overtime +
                "\n Basic Pay: " + basicPay +
                "\n Total Pay: " + totalPay;
        }
        public Admin(string name) : base(name, adminHourlyRate)
        {

        }
    }

    public class FileReader
    {
        public List<Staff> readFile()
        {
            List<Staff> myStaff = new List<Staff>();
            string[] result = new string[2];
            string path = @"staff.txt";
            if (File.Exists(path)) { Console.WriteLine("File : {0} exist", path); }
            else { 
                Console.WriteLine("Creating File : {0} ..... ", path); 
                FileStream fs = File.Create(path);
                fs.Close();
            }
            string[] seperator = {", "};

            using (StreamReader sr = new StreamReader(path))
            {
                while (!sr.EndOfStream)
                {
                    result = sr.ReadLine().Split(seperator, StringSplitOptions.RemoveEmptyEntries);

                    if (result[1] == "Manager")
                    {
                        myStaff.Add(new Manager(result[0]));
                    }
                    else if (result[1] == "Admin")
                    {
                        myStaff.Add(new Admin(result[0]));
                    }
                }
                sr.Close();
            }

            return myStaff;
        }
    }

    public class PaySlip
    {
        private int month;
        private int year;

        enum monthsOfYear { JAN, FEB, MARCH, APRIL, MAY, JUNE, JULY, AUG, SEPT, OCT, NOV, DEC }

        public PaySlip(int payMonth, int payYear)
        {
            month = payMonth;
            year = payYear;
        }

        public void generatePaySlip(List<Staff> myStaff)
        {
            string path;
            foreach (var staff in myStaff)
            {
                path = staff.nameOfStaff + ".txt";
                if (File.Exists(path)){Console.WriteLine("File : {0} exist", path); }
                else { 
                    Console.WriteLine("Creating File : {0} ..... ", path); 
                    FileStream fs = File.Create(path);
                    fs.Close();
                }

                using (StreamWriter sw = new StreamWriter(path))
                {
                    sw.WriteLine("PAYSLIP FOR {0} {1}", monthsOfYear.DEC, year);
                    sw.WriteLine("========================================");
                    sw.WriteLine("Name of Staff: {0}", staff.nameOfStaff);
                    sw.WriteLine("Hours Worked: {0}", staff.hoursWorked);
                    sw.WriteLine(" ");
                    sw.WriteLine("Basic Pay: {0:C}", (decimal)staff.basicPay);
                    if (staff.GetType() == typeof(Manager))
                    {
                        sw.WriteLine("Allowance: {0:C}", ((Manager)staff).Allowance);
                    }
                    else
                    {
                        sw.WriteLine("Allowance: {0:C}", ((Admin)staff).overtime);
                    }
                    sw.WriteLine(" ");
                    sw.WriteLine("========================================");
                    sw.WriteLine("Total Pay: {0:C}", (decimal)staff.totalPay);
                    sw.Close();
                }
            }
        }

        public void generateSummary(List<Staff> staffs)
        {
            var belowTenHours = from staff in staffs where staff.hoursWorked < 10 orderby staff.hoursWorked ascending select new { staff.nameOfStaff, staff.hoursWorked };

            var path = @"summary.txt";
            if (File.Exists(path))
            { Console.WriteLine("File : {0} exist", path); }
            else{ 
                Console.WriteLine("Creating File : {0} ..... ", path);
                FileStream fs = File.Create(path);
                fs.Close();
            }

            using (
                StreamWriter sw = new StreamWriter(path))
            {
                sw.WriteLine("Staff with less than 10 working hours");
                sw.WriteLine(" ==================================== ");
                sw.WriteLine(" ");
                foreach (var entry in belowTenHours)
                {
                    sw.WriteLine("Name of staff: {0}, \t Hours worked: {1}", entry.nameOfStaff, entry.hoursWorked);
                }
                sw.Close();
            }

        }

        public override string ToString()
        {
            return "\nMonth: " + month + "Year: " + year;
        }
    }
}
