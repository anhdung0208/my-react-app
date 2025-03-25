    
const AddProductPopup = () => {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        sales: 0,
    });

    return (
        <div className="modal fade" id="addProductPopup" tabIndex={-1} aria-labelledby="addProductPopupLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addProductPopupLabel">Add Product</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" id="category" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stock" className="form-label">Stock</label>
                                <input type="number" className="form-control" id="stock" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sales" className="form-label">Sales</label>
                                <input type="number" className="form-control" id="sales" />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
