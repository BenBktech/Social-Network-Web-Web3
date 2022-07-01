const hasMetamask = (): boolean => {
    return (
        typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
    )
}

export { hasMetamask }