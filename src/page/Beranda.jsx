import { Button, Col, Container, Dropdown, Form, Modal, OverlayTrigger, Pagination, Row, Stack, Table, Tooltip } from "react-bootstrap"
import Header from "../component/Header"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TasksService from "../services/TasksService";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";

const Beranda = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({ data: [] });
    const token = localStorage.getItem('token');
    const [showDetail, setShowDetail] = useState(false);
    const [detailData, setDetailData] = useState();
    const [statusModal, setStatusModal] = useState();
    const [titleModel, setTitleModel] = useState("Detail Tasks");
    const [sortBy, setSortBy] = useState("created_at");
    const [sortDir, setSortDir] = useState("asc");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchStatus, setSearchStatus] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        const userLoggedIn = localStorage.getItem('user');
        if (!userLoggedIn) {
            navigate('/login');
        }
    }, [navigate]);

    const getListData = () => {
        TasksService.getList(token, sortBy, sortDir, searchStatus, searchTitle, currentPage).then((res) => {
            setData(res.data)
            console.log(data)
            setTotalPages(res.data.last_page);
        })
    }

    useEffect(() => {
        getListData()
    }, [sortBy, sortDir, currentPage])

    const handleClose = () => {
        setShowDetail(false);
        setDetailData({})
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip">
            {props}
        </Tooltip>
    );

    const getDetailTasks = (id) => {
        TasksService.getDetail(token, id).then((res) => {
            console.log(res.data)
            setDetailData(res.data)
        })
        setTitleModel("Detail Tasks")
        setShowDetail(true)
        setStatusModal(false)
    };

    const addDetailTasks = () => {
        setTitleModel("Tambah Tasks")
        setStatusModal(true)
        setShowDetail(true)
    }

    const simpanData = () => {
        if (detailData?.id) {
            TasksService.updateTasks(token, detailData.id, detailData).then((res) => {
                console.log(res)
                setShowDetail(false)
                getListData()
                setDetailData({})
            })
        } else {
            console.log("data baru");
            TasksService.createTasks(token, detailData).then((res) => {
                console.log(res)
                setShowDetail(false)
                getListData()
                setDetailData({})
            }).catch((error) => {
                console.log(error.response)
                toast.error(error.response.status + " " + error.response.data.message)
            })

            // setTimeout(() => {
            //     setShowToast(false)
            // }, 3000);
        }
    }

    const handleSortBy = (sort, dir) => {
        setSortBy(sort)
        setSortDir(dir)
    }

    const deleteTasks = (id) => {
        TasksService.deleteTasks(token, id).then((res) => {
            getListData()
        })
    }

    const editDetailTasks = (id) => {
        TasksService.getDetail(token, id).then((res) => {
            console.log(res.data)
            setDetailData(res.data)
        })
        setTitleModel("Edit Tasks")
        setShowDetail(true)
        setStatusModal(true)
    };
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage)
    }

    return (
        <>
            <Header />
            <Container className="py-5">
                <Row className="py-lg-5">
                    <Col>
                        <h2>Beranda</h2>
                    </Col>
                </Row>
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2 row">
                        <div className="col col-md-5">
                            <Form.Control type="text" placeholder="Judul" onChange={(e) => setSearchTitle(e.target.value)} />
                        </div>
                        <div className="col col-auto">
                            <Form.Select aria-label="Status" onChange={(e) => setSearchStatus(e.target.value)}>
                                <option value="">-- Status --</option>
                                <option value="pending">pending</option>
                                <option value="completed">completed</option>
                            </Form.Select>
                        </div>
                        <div className="col">
                            <Button onClick={getListData}>cari</Button>
                        </div>
                    </div>
                    <div className="p-2 ms-auto"><Button onClick={() => addDetailTasks()}>Tambah</Button></div>
                    <div className="p-2">
                        <Dropdown >
                            <Dropdown.Toggle className="btn">
                                Sort By
                            </Dropdown.Toggle>

                            <Dropdown.Menu >
                                <Dropdown.Item onClick={(e) => handleSortBy("title", "asc")}>Judul A-Z</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => handleSortBy("title", "desc")}>Judul Z-A</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => handleSortBy("created_at", "desc")}>Terbaru</Dropdown.Item>
                                <Dropdown.Item onClick={(e) => handleSortBy("created_at", "asc")}>Terlama</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Stack>
                <Table className="table-style" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Judul</th>
                            <th>Status</th>
                            <th>Dibuat Oleh</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.length != 0 ? (
                            data.data.map((item, index) => (
                                <tr>
                                    <td>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {item.title}
                                    </td>
                                    <td>
                                        {item.status}
                                    </td>
                                    <td>
                                        {item.user.name}
                                    </td>
                                    <td>
                                        <div className="row justify-content-md-center">
                                            <div className="col-auto p-1">
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 100, hide: 100 }}
                                                    overlay={renderTooltip("Detail Tasks")}
                                                >
                                                    <Button size="sm" onClick={() => getDetailTasks(item.id)}><CgDetailsMore /></Button>
                                                </OverlayTrigger>
                                            </div>
                                            <div className="col-auto p-1">
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 100, hide: 100 }}
                                                    overlay={renderTooltip("Hapus Tasks")}
                                                >
                                                    <Button size="sm" onClick={() => deleteTasks(item.id)}><FaRegTrashAlt /></Button>
                                                </OverlayTrigger>
                                            </div>
                                            <div className="col-auto p-1">
                                                <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 100, hide: 100 }}
                                                    overlay={renderTooltip("Edit Tasks")}
                                                >
                                                    <Button size="sm" onClick={() => editDetailTasks(item.id)}><FaRegEdit /></Button>
                                                </OverlayTrigger>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center">Data tidak ditemukan</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <Pagination className="justify-content-center">
                    <Pagination.Prev
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            active={currentPage === index + 1}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </Container>
            <Modal show={showDetail} centered>
                <Modal.Header>
                    <Modal.Title>{titleModel}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" value={detailData?.title} onChange={(e) => setDetailData({ ...detailData, title: e.target.value })} disabled={statusModal ? false : true} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Deskipsi</Form.Label>
                            <Form.Control as="textarea" rows={3} value={detailData?.description} onChange={(e) => setDetailData({ ...detailData, description: e.target.value })} disabled={statusModal ? false : true} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Deskipsi</Form.Label>
                            <Form.Control type="text" rows={3} value={detailData?.status} disabled={statusModal ? false : true} hidden={statusModal ? true : false} />
                            <Form.Select aria-label="Default select example" onChange={(e) => setDetailData({ ...detailData, status: e.target.value })} hidden={statusModal ? false : true} value={detailData?.status}>
                                <option>Open this select menu</option>
                                <option value="pending">pending</option>
                                <option value="completed">completed</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" hidden={statusModal ? true : false}>
                            <Form.Label>Dibuat oleh</Form.Label>
                            <Form.Control type="text" value={detailData?.user?.name} disabled={statusModal ? false : true} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="secondary" onClick={simpanData} hidden={statusModal ? false : true}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Beranda