const apiResponse = {
    success: true,
    message:'Form successfully submitted...'
}

export const apiCallSimulator = (ms) => {
    return new Promise(resolve => setTimeout(() => resolve(apiResponse), ms));
}