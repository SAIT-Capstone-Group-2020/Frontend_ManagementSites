
export const checkDate = (startDate, endDate) => {
    var valid;

    try {
        // checks if date is in valid format
        Date.parse(startDate);
        Date.parse(endDate);

        // checks if start date is after the end date
        if (Date.parse(startDate) > Date.parse(endDate)) {
            valid = false;
        }

        else {
            valid = true;
        }
    } catch (error) {
        valid = false;
    }

    // if both of the above coditions are correct, return valid as true
    return valid;
};

export const checkPrice = (originalPrice, discountPrice) => {
    var valid;

    // checks of discounted price is higher than original
    if (discountPrice > originalPrice) {
        valid = false;
    }
    // checks if either variable is a valid number
    else if (!Number.isNaN(discountPrice) || !Number.isNaN(originalPrice)) {
        valid = false;
    }
    else {
        valid = true;
    }
    // if both of the above coditions are correct, return valid as true
    return valid;
}

export const checkProduct = obj => {
    var valid;

    try {

        var productName = obj.name;
        var productDescription = obj.description;
        var productBrand = obj.brand;
        var productPrice = obj.price;
        var productActive = obj.active;
        var productImage = obj.image;
        var productCategory = obj.category;
        var productQuantity = obj.quantity;
        var productWeightValue = obj.weightValue;
        var productWeightType = obj.weightType;

        if (!typeof productName === 'string' || !productName instanceof String) {
            valid = false;
        }

        else if (!typeof productDescription === 'string' || !productDescription instanceof String) {
            valid = false;
        }

        else if (!typeof productBrand === 'string' || !productBrand instanceof String) {
            valid = false;
        }

        else if (!Number.isNaN(productPrice)) {
            valid = false;
        }

        else if (!typeof productActive === 'boolean' || !productActive instanceof Boolean) {
            valid = false;
        }

        else if (!typeof productImage === 'string' || !productImage instanceof String) {
            valid = false;
        }

        else if (!Number.isNaN(productCategory)) {
            valid = false;
        }

        else if (!Number.isNaN(productQuantity)) {
            valid = false;
        }

        else if (!Number.isNaN(productQuantity)) {
            valid = false;
        }

        else if (!Number.isNaN(productWeightValue)) {
            valid = false;
        }

        else if (!Number.isNaN(productWeightType)) {
            valid = false;
        }

        else {
            valid = true;
        }

    } catch (error) {
        valid = false;
    }

    return valid;

}
export const validateProduct = (product, weighttype, category) => {
    try {
        let valid;
        if (!product.price > 0 || product.price < 1000) {
            valid = false;
        }
        else if (!product.category.contains(category)) {
            valid = false;
        }
        else if (!product.weightType.contains(weighttype)) {
            valid = false;
        }
        else if (!product.active == true) {
            valid = false;
        }
        else if (product.description == null) {
            valid = false;
        }
        else if (product.name == null) {
            valid = false;
        }
        else if (product.image == null) {
            valid = false;
        }
        else if (product.brand == null) {
            valid = false;
        }
        else if (!product.quantity > 0) {
            valid = false;
        }
    }
    catch (error) {
        valid = false;
    }
    return valid;
}

export const validatelogin = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

export const checkDate = (startDate, endDate) => {
    let error = "End Date earlier than Start Date";
    let error2 = "Null date";
    if (startDate > endDate) {
        return error;
    } else if (startDate == null || endDate == null) {
        return error2;
    }
    else {
        return true;
    }
    
}

export const checkPrice = (originalPrice, discountPrice) => {
    let error = "Discount Price higher than original Price";
    let error2 = "Null Value in price";
    if (originalPrice < discountPrice) {
        return error;
    } else if (originalPrice == null || discountPrice == null) {
        return error2;
    }
    else {
        return true;
    }
}
