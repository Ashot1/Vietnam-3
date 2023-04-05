import Loading from "../components/Loading/Loading";

export default function LoadingData({children, loading}) {
	if (loading) return <Loading/>
	
	return children
}
