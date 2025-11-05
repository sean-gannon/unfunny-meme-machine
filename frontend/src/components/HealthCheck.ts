import { useEffect } from 'react';

export default function HealthCheck() {
    useEffect(() => {
        fetch("http://localhost:8080/api/health")
            .then(res => res.text())
            .then(console.log);
    }, []);
    return null;
}
