import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

interface TripData {
  vendorId: number;
  tpepPickupDatetime: string;
  tpepDropoffDatetime: string;
  passengerCount: number;
  tripDistance: number;
  ratecodeId: number;
  storeAndFwdFlag: string;
  puLocationId: number;
  doLocationId: number;
  paymentType: number;
  fareAmount: string;
  extra: number;
  mtaTax: number;
  tipAmount: number;
  tollsAmount: number;
  improvementSurcharge: number;
  totalAmount: number;
}

interface ApiResponse {
  meta: Array<{ name: string; type: string }>;
  data: TripDataResponse[];
}

interface TripDataResponse {
  vendorid: number;
  tpep_pickup_datetime: string;
  tpep_dropoff_datetime: string;
  passenger_count: number;
  trip_distance: number;
  ratecodeid: number;
  store_and_fwd_flag: string;
  pulocationid: number;
  dolocationid: number;
  payment_type: number;
  fare_amount: string;
  extra: number;
  mta_tax: number;
  tip_amount: number;
  tolls_amount: number;
  improvement_surcharge: number;
  total_amount: number;
}

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}

type Result<T> = { success: true; data: T } | { success: false; error: CustomError };

interface TripDistanceRange {
  min: number;
  max: number;
}

const MAX_TRIP_DISTANCE = 50;
const INITIAL_TRIP_DISTANCE_RANGE: TripDistanceRange = { min: 0, max: 10 };

const Dashboard: React.FC = () => {
  const [data, setData] = useState<Result<TripData[]>>({ success: true, data: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [tripDistanceRange, setTripDistanceRange] = useState<TripDistanceRange>(INITIAL_TRIP_DISTANCE_RANGE);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(
          "https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json?q=SELECT+*+FROM+yellow_tripdata_2017_pipe+LIMIT+100&token=p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c"
        );
        if (!response.ok) {
          throw new CustomError("Network response was not ok");
        }
        const result: ApiResponse = await response.json();
        const mappedData: TripData[] = result.data.map((item: TripDataResponse) => ({
          vendorId: item.vendorid,
          tpepPickupDatetime: new Date(item.tpep_pickup_datetime).toLocaleString(),
          tpepDropoffDatetime: new Date(item.tpep_dropoff_datetime).toLocaleString(),
          passengerCount: item.passenger_count,
          tripDistance: item.trip_distance,
          ratecodeId: item.ratecodeid,
          storeAndFwdFlag: item.store_and_fwd_flag,
          puLocationId: item.pulocationid,
          doLocationId: item.dolocationid,
          paymentType: item.payment_type,
          fareAmount: item.fare_amount,
          extra: item.extra,
          mtaTax: item.mta_tax,
          tipAmount: item.tip_amount,
          tollsAmount: item.tolls_amount,
          improvementSurcharge: item.improvement_surcharge,
          totalAmount: item.total_amount,
        }));
        setData({ success: true, data: mappedData });
      } catch (error) {
        setData({ success: false, error: new CustomError("Error fetching data") });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = Number(event.target.value);
    setTripDistanceRange({ min: 0, max: value });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data.success) {
    return <div>{data.error.message}</div>;
  }

  const filteredData = data.data.filter(
    (item) => item.tripDistance >= tripDistanceRange.min && item.tripDistance <= tripDistanceRange.max
  );

  const chartData = {
    labels: filteredData.map((item) => item.tpepPickupDatetime),
    datasets: [
      {
        label: "Trip Distance",
        data: filteredData.map((item) => item.tripDistance),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <label>
          Filter by Trip Distance (Max):
          <input
            type="range"
            min="0"
            max={MAX_TRIP_DISTANCE}
            value={tripDistanceRange.max}
            onChange={handleRangeChange}
          />
          {tripDistanceRange.max} miles
        </label>
      </div>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;
