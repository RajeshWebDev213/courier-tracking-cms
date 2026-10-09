import { useCallback, useEffect, useState } from "react";
import { getMyShipments } from "../services/ShipmentServices";

const useShipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyShipments();

      setShipments(response.shipments || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch shipments"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  return {
    shipments,
    loading,
    error,
    fetchShipments,
  };
};

export default useShipments;